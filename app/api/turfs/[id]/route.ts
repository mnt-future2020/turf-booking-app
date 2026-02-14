import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const turf = await prisma.turf.findUnique({
      where: { id },
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
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        bookings: {
          where: {
            bookingDate: {
              gte: new Date(),
            },
          },
          select: {
            bookingDate: true,
            startTime: true,
            endTime: true,
            status: true,
          },
        },
      },
    });

    if (!turf) {
      return NextResponse.json({ error: 'Turf not found' }, { status: 404 });
    }

    const averageRating =
      turf.reviews.length > 0
        ? turf.reviews.reduce((acc, review) => acc + review.rating, 0) /
          turf.reviews.length
        : 0;

    return NextResponse.json({ ...turf, averageRating });
  } catch (error) {
    console.error('Error fetching turf:', error);
    return NextResponse.json(
      { error: 'Failed to fetch turf' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const turf = await prisma.turf.findUnique({
      where: { id },
    });

    if (!turf) {
      return NextResponse.json({ error: 'Turf not found' }, { status: 404 });
    }

    if (
      turf.ownerId !== session.user.id &&
      session.user.role !== UserRole.ADMIN
    ) {
      return NextResponse.json(
        { error: 'You do not have permission to update this turf' },
        { status: 403 }
      );
    }

    const body = await request.json();

    const updatedTurf = await prisma.turf.update({
      where: { id },
      data: body,
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

    return NextResponse.json({
      message: 'Turf updated successfully',
      turf: updatedTurf,
    });
  } catch (error) {
    console.error('Error updating turf:', error);
    return NextResponse.json(
      { error: 'Failed to update turf' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const turf = await prisma.turf.findUnique({
      where: { id },
    });

    if (!turf) {
      return NextResponse.json({ error: 'Turf not found' }, { status: 404 });
    }

    if (
      turf.ownerId !== session.user.id &&
      session.user.role !== UserRole.ADMIN
    ) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this turf' },
        { status: 403 }
      );
    }

    await prisma.turf.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Turf deleted successfully' });
  } catch (error) {
    console.error('Error deleting turf:', error);
    return NextResponse.json(
      { error: 'Failed to delete turf' },
      { status: 500 }
    );
  }
}
