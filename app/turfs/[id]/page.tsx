'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, DollarSign, Calendar, Users, CheckCircle, ArrowLeft } from 'lucide-react';

interface Turf {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  pincode: string;
  type: string;
  pricePerHour: number;
  openTime: string;
  closeTime: string;
  amenities: string[];
  rules: string;
  latitude: number;
  longitude: number;
  active: boolean;
}

export default function TurfDetailPage() {
  const params = useParams();
  const [turf, setTurf] = useState<Turf | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      // For now, showing dummy data. Replace with API call
      setTurf({
        id: params.id as string,
        name: 'Green Valley Sports Arena',
        description: 'Premium cricket and football turf with state-of-the-art facilities. Perfect for professional matches and casual games.',
        address: '123 Sports Street, Anna Nagar',
        city: 'Chennai',
        pincode: '600040',
        type: 'Cricket',
        pricePerHour: 1500,
        openTime: '06:00',
        closeTime: '22:00',
        amenities: ['Parking', 'Washrooms', 'Changing Rooms', 'Drinking Water', 'First Aid', 'Lighting'],
        rules: 'No smoking, No alcohol, Wear proper sports shoes, Respect other players',
        latitude: 13.0827,
        longitude: 80.2707,
        active: true
      });
      setLoading(false);
    }
  }, [params.id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    
    // Simulate booking API call
    setTimeout(() => {
      alert('Booking created successfully! Redirecting to bookings page...');
      setBookingLoading(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading turf details...</p>
        </div>
      </div>
    );
  }

  if (!turf) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Turf Not Found</h2>
          <p className="text-gray-600 mb-4">The turf you're looking for doesn't exist.</p>
          <Link href="/turfs">
            <Button>Browse All Turfs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/turfs" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all turfs
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg h-96 flex items-center justify-center mb-6">
              <MapPin className="h-32 w-32 text-white opacity-50" />
            </div>

            {/* Turf Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{turf.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{turf.address}, {turf.city} - {turf.pincode}</span>
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">4.5</span>
                  <span className="text-gray-600 ml-1">(24 reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{turf.type}</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-3">About this turf</h2>
                <p className="text-gray-700">{turf.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {turf.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Rules & Regulations</h2>
              <p className="text-gray-700 whitespace-pre-line">{turf.rules}</p>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
              <div className="flex items-center text-gray-700">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                <span>{turf.openTime} AM - {turf.closeTime} PM</span>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-green-600">₹{turf.pricePerHour}</span>
                  <span className="text-gray-600">per hour</span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <Star className="h-4 w-4" />
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Start Time
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    End Time
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price per hour</span>
                    <span className="font-medium">₹{turf.pricePerHour}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">
                      {startTime && endTime ? `${Math.abs(parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0]))} hours` : '0 hours'}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">
                      ₹{startTime && endTime ? Math.abs(parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0])) * turf.pricePerHour : 0}
                    </span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Processing...' : 'Book Now'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You won't be charged yet
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
