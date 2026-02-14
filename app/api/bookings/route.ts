import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { BookingStatus } from '@prisma/client';

const bookingSchema = z.object({
  turfId: z.string(),
  bookingDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  notes: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const turfId = searchParams.get('turfId');
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    const where: any = {};

    if (session.user.role === 'CUSTOMER') {
      where.userId = session.user.id;
    } else if (turfId) {
      where.turfId = turfId;
    }

    if (userId && session.user.role === 'ADMIN') {
      where.userId = userId;
    }

    if (status) {
      where.status = status as BookingStatus;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        turf: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
            type: true,
            images: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        payment: true,
      },
      orderBy: {
        bookingDate: 'desc',
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    const turf = await prisma.turf.findUnique({
      where: { id: validatedData.turfId },
    });

    if (!turf) {
      return NextResponse.json({ error: 'Turf not found' }, { status: 404 });
    }

    if (!turf.isActive) {
      return NextResponse.json(
        { error: 'Turf is not available for booking' },
        { status: 400 }
      );
    }

    const bookingDate = new Date(validatedData.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return NextResponse.json(
        { error: 'Cannot book for past dates' },
        { status: 400 }
      );
    }

    const existingBooking = await prisma.booking.findFirst({
      where: {
        turfId: validatedData.turfId,
        bookingDate,
        status: {
          in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
        },
        OR: [
          {
            AND: [
              { startTime: { lte: validatedData.startTime } },
              { endTime: { gt: validatedData.startTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: validatedData.endTime } },
              { endTime: { gte: validatedData.endTime } },
            ],
          },
          {
            AND: [
              { startTime: { gte: validatedData.startTime } },
              { endTime: { lte: validatedData.endTime } },
            ],
          },
        ],
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 400 }
      );
    }

    const [startHour, startMinute] = validatedData.startTime.split(':').map(Number);
    const [endHour, endMinute] = validatedData.endTime.split(':').map(Number);
    const totalHours = (endHour * 60 + endMinute - (startHour * 60 + startMinute)) / 60;

    if (totalHours <= 0) {
      return NextResponse.json(
        { error: 'End time must be after start time' },
        { status: 400 }
      );
    }

    const totalAmount = totalHours * turf.pricePerHour;

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        turfId: validatedData.turfId,
        bookingDate,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        totalHours: Math.ceil(totalHours),
        totalAmount,
        notes: validatedData.notes,
        status: BookingStatus.PENDING,
      },
      include: {
        turf: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Booking created successfully', booking },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
