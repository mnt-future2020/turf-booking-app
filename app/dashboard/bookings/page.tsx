'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Filter, Search, ArrowLeft, XCircle, CheckCircle } from 'lucide-react';

export default function BookingsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const handlePayNow = (bookingId: string, amount: number) => {
    if (confirm(`Proceed to pay ₹${amount}?`)) {
      alert('Redirecting to payment gateway...');
      // Add payment logic here
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      alert('Booking cancelled successfully!');
      // Add cancel logic here
    }
  };

  const handleWriteReview = (bookingId: string) => {
    alert('Review form coming soon!');
    // Navigate to review page
  };

  const handleViewDetails = (bookingId: string) => {
    alert(`Viewing booking details for ID: ${bookingId}`);
    // Navigate to booking detail page
  };
  const [bookings] = useState([
    {
      id: '1',
      turfName: 'Green Valley Sports Arena',
      location: 'Anna Nagar, Chennai',
      date: '2024-02-20',
      time: '10:00 - 12:00',
      hours: 2,
      status: 'confirmed',
      amount: 3000,
      paymentStatus: 'paid'
    },
    {
      id: '2',
      turfName: 'Champions Turf',
      location: 'T Nagar, Chennai',
      date: '2024-02-22',
      time: '14:00 - 16:00',
      hours: 2,
      status: 'pending',
      amount: 2400,
      paymentStatus: 'pending'
    },
    {
      id: '3',
      turfName: 'Victory Ground',
      location: 'Adyar, Chennai',
      date: '2024-02-15',
      time: '16:00 - 18:00',
      hours: 2,
      status: 'completed',
      amount: 3600,
      paymentStatus: 'paid'
    },
    {
      id: '4',
      turfName: 'Sports Complex',
      location: 'Velachery, Chennai',
      date: '2024-02-10',
      time: '18:00 - 20:00',
      hours: 2,
      status: 'cancelled',
      amount: 2800,
      paymentStatus: 'refunded'
    },
    {
      id: '5',
      turfName: 'Elite Turf Arena',
      location: 'OMR, Chennai',
      date: '2024-02-25',
      time: '08:00 - 10:00',
      hours: 2,
      status: 'confirmed',
      amount: 3200,
      paymentStatus: 'paid'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'refunded':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage all your turf bookings</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'confirmed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('confirmed')}
              >
                Confirmed
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
              <Button
                variant={filter === 'cancelled' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('cancelled')}
              >
                Cancelled
              </Button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">You haven't made any bookings yet or no bookings match your filter.</p>
              <Link href="/turfs">
                <Button>Browse Turfs</Button>
              </Link>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div 
                key={booking.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {booking.turfName}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {booking.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {booking.time} ({booking.hours}h)
                      </div>
                      <div className={`flex items-center font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus === 'paid' && <CheckCircle className="h-4 w-4 mr-1" />}
                        {booking.paymentStatus === 'pending' && <Clock className="h-4 w-4 mr-1" />}
                        {booking.paymentStatus === 'refunded' && <CheckCircle className="h-4 w-4 mr-1" />}
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </div>
                    </div>
                  </div>

                  {/* Amount and Actions */}
                  <div className="flex flex-col items-end gap-3 md:min-w-[200px]">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">₹{booking.amount}</p>
                    </div>

                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePayNow(booking.id, booking.amount)}
                          >
                            Pay Now
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel Booking
                        </Button>
                      )}
                      {booking.status === 'completed' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleWriteReview(booking.id)}
                        >
                          Write Review
                        </Button>
                      )}
                      <Button 
                        size="sm"
                        onClick={() => handleViewDetails(booking.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Booking Summary */}
        {filteredBookings.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{filteredBookings.length}</p>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {filteredBookings.filter(b => b.status === 'confirmed').length}
                </p>
                <p className="text-sm text-gray-600">Confirmed</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {filteredBookings.filter(b => b.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">
                  ₹{filteredBookings.reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? b.amount : 0), 0)}
                </p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
