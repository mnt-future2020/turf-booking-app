import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { TurfType, UserRole } from '@prisma/client';

const turfSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  type: z.nativeEnum(TurfType),
  pricePerHour: z.number().positive('Price must be greater than 0'),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  amenities: z.array(z.string()),
  rules: z.array(z.string()),
  openTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  closeTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const type = searchParams.get('type');
    const ownerId = searchParams.get('ownerId');

    const where: any = { isActive: true };

    if (city) where.city = city;
    if (type) where.type = type as TurfType;
    if (ownerId) where.ownerId = ownerId;

    const turfs = await prisma.turf.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const turfsWithRating = turfs.map((turf) => ({
      ...turf,
      averageRating:
        turf.reviews.length > 0
          ? turf.reviews.reduce((acc, review) => acc + review.rating, 0) /
            turf.reviews.length
          : 0,
    }));

    return NextResponse.json(turfsWithRating);
  } catch (error) {
    console.error('Error fetching turfs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch turfs' },
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

    if (session.user.role !== UserRole.TURF_OWNER && session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Only turf owners can create turfs' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = turfSchema.parse(body);

    const turf = await prisma.turf.create({
      data: {
        ...validatedData,
        ownerId: session.user.id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Turf created successfully', turf },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating turf:', error);
    return NextResponse.json(
      { error: 'Failed to create turf' },
      { status: 500 }
    );
  }
}
