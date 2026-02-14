'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Calendar, TrendingUp, Plus, Edit, Trash, Eye } from 'lucide-react';

export default function OwnerDashboardPage() {
  const router = useRouter();

  const handleViewTurf = (turfId: string) => {
    router.push(`/turfs/${turfId}`);
  };

  const handleEditTurf = (turfId: string) => {
    alert(`Edit turf page coming soon for turf ID: ${turfId}`);
    // router.push(`/dashboard/owner/turfs/${turfId}/edit`);
  };

  const handleDeleteTurf = (turfId: string, turfName: string) => {
    if (confirm(`Are you sure you want to delete "${turfName}"? This action cannot be undone.`)) {
      alert('Turf deleted successfully!');
      // Add delete logic here
    }
  };
  const [stats] = useState({
    totalTurfs: 3,
    activeTurfs: 2,
    totalBookings: 45,
    totalRevenue: 135000,
    monthlyRevenue: 45000,
    pendingBookings: 5
  });

  const [turfs] = useState([
    {
      id: '1',
      name: 'Green Valley Sports Arena',
      location: 'Anna Nagar, Chennai',
      type: 'Cricket',
      pricePerHour: 1500,
      active: true,
      bookings: 15,
      revenue: 45000
    },
    {
      id: '2',
      name: 'Champions Turf',
      location: 'T Nagar, Chennai',
      type: 'Football',
      pricePerHour: 1200,
      active: true,
      bookings: 20,
      revenue: 48000
    },
    {
      id: '3',
      name: 'Victory Ground',
      location: 'Adyar, Chennai',
      type: 'Multi-Sport',
      pricePerHour: 1800,
      active: false,
      bookings: 10,
      revenue: 42000
    }
  ]);

  const [recentBookings] = useState([
    {
      id: '1',
      turfName: 'Green Valley Sports Arena',
      customerName: 'Raj Kumar',
      date: '2024-02-20',
      time: '10:00 - 12:00',
      status: 'confirmed',
      amount: 3000
    },
    {
      id: '2',
      turfName: 'Champions Turf',
      customerName: 'Priya Sharma',
      date: '2024-02-22',
      time: '14:00 - 16:00',
      status: 'pending',
      amount: 2400
    },
    {
      id: '3',
      turfName: 'Green Valley Sports Arena',
      customerName: 'Arjun Patel',
      date: '2024-02-18',
      time: '16:00 - 18:00',
      status: 'completed',
      amount: 3000
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Turf Owner Dashboard</h1>
            <p className="text-gray-600">Manage your turfs and track performance</p>
          </div>
          <Link href="/dashboard/owner/turfs/new">
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add New Turf
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Turfs</span>
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalTurfs}</p>
            <p className="text-sm text-green-600 mt-1">{stats.activeTurfs} active</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Bookings</span>
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{stats.totalBookings}</p>
            <p className="text-sm text-gray-600 mt-1">{stats.pendingBookings} pending</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Revenue</span>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">₹{stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">All time</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Monthly Revenue</span>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-purple-600">₹{stats.monthlyRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">+15% from last month</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Turfs */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Turfs</h2>
              <Link href="/dashboard/owner/turfs">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>

            <div className="space-y-4">
              {turfs.map((turf) => (
                <div 
                  key={turf.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{turf.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {turf.location}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">{turf.type}</span>
                        <span className="font-medium text-green-600">₹{turf.pricePerHour}/hr</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${turf.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {turf.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-600">{turf.bookings} bookings</span>
                      <span className="text-green-600 font-medium">₹{turf.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewTurf(turf.id)}
                        title="View Turf"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditTurf(turf.id)}
                        title="Edit Turf"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteTurf(turf.id, turf.name)}
                        title="Delete Turf"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
              <Link href="/dashboard/owner/bookings">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{booking.turfName}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Customer: {booking.customerName}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {booking.date}
                      </span>
                      <span>{booking.time}</span>
                    </div>
                    <span className="font-bold text-gray-900">₹{booking.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Trend</h2>
          <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Revenue chart visualization will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
