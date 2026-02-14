import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star } from 'lucide-react';

export default function TurfsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Browse Turfs
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Turf Cards */}
          <TurfCard
            id="1"
            name="Green Valley Sports Arena"
            location="Anna Nagar, Chennai"
            sport="Cricket, Football"
            rating={4.5}
            price="₹1500"
            image="/placeholder-turf.jpg"
          />
          <TurfCard
            id="2"
            name="Champions Turf"
            location="T Nagar, Chennai"
            sport="Football, Badminton"
            rating={4.8}
            price="₹1200"
            image="/placeholder-turf.jpg"
          />
          <TurfCard
            id="3"
            name="Victory Ground"
            location="Adyar, Chennai"
            sport="Cricket, Tennis"
            rating={4.6}
            price="₹1800"
            image="/placeholder-turf.jpg"
          />
        </div>
      </div>
    </div>
  );
}

function TurfCard({ 
  id,
  name, 
  location, 
  sport, 
  rating, 
  price,
  image 
}: { 
  id: string;
  name: string; 
  location: string; 
  sport: string; 
  rating: number; 
  price: string;
  image: string;
}) {
  return (
    <Link href={`/turfs/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
          <MapPin className="h-16 w-16 text-white opacity-50" />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{sport}</span>
          </div>
          <div className="flex items-center mb-4">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">{price}</span>
            <Button>View Details</Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
