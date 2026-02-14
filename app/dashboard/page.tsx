'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, User, CreditCard, Settings, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    joinedDate: 'Jan 2024'
  });

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Add logout logic here (clear session, etc.)
      alert('Logged out successfully!');
      router.push('/');
    }
  };

  const [stats] = useState({
    totalBookings: 12,
    upcomingBookings: 3,
    completedBookings: 8,
    cancelledBookings: 1
  });

  const [recentBookings] = useState([
    {
      id: '1',
      turfName: 'Green Valley Sports Arena',
      date: '2024-02-20',
      time: '10:00 - 12:00',
      status: 'confirmed',
      amount: 3000
    },
    {
      id: '2',
      turfName: 'Champions Turf',
      date: '2024-02-18',
      time: '14:00 - 16:00',
      status: 'completed',
      amount: 2400
    },
    {
      id: '3',
      turfName: 'Victory Ground',
      date: '2024-02-15',
      time: '16:00 - 18:00',
      status: 'completed',
      amount: 3600
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">Joined {user.joinedDate}</p>
              </div>

              <nav className="space-y-2">
                <Link href="/dashboard">
                  <div className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-md font-medium">
                    <User className="h-5 w-5 mr-3" />
                    Overview
                  </div>
                </Link>
                <Link href="/dashboard/bookings">
                  <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    <Calendar className="h-5 w-5 mr-3" />
                    My Bookings
                  </div>
                </Link>
                <button 
                  onClick={() => alert('Profile settings coming soon!')}
                  className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Profile Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm">Total Bookings</span>
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm">Upcoming</span>
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-blue-600">{stats.upcomingBookings}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm">Completed</span>
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-green-600">{stats.completedBookings}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm">Cancelled</span>
                  <Calendar className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-red-600">{stats.cancelledBookings}</p>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
                <Link href="/dashboard/bookings">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div 
                    key={booking.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{booking.turfName}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <p className="text-lg font-bold text-gray-900">₹{booking.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-md p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Ready to play?</h2>
              <p className="mb-6 opacity-90">Book your favorite turf and enjoy your game!</p>
              <Link href="/turfs">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  <MapPin className="mr-2 h-5 w-5" />
                  Browse Turfs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
