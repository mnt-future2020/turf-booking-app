import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Shield, Star, TrendingUp, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Book Your Perfect Turf in{' '}
              <span className="text-green-600">Minutes</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0">
              Find and book sports turfs near you. Whether it's cricket, football, badminton, or tennis - we've got you covered!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link href="/turfs" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto min-h-[48px] text-base">
                  <MapPin className="mr-2 h-5 w-5" />
                  Browse Turfs
                </Button>
              </Link>
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px] text-base">
                  List Your Turf
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose TurfBooking?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-green-600" />}
              title="Easy Booking"
              description="Book your favorite turf in just a few clicks. Real-time availability and instant confirmation."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-green-600" />}
              title="Secure Payments"
              description="Safe and secure payment gateway integration. Multiple payment options available."
            />
            <FeatureCard
              icon={<Star className="h-10 w-10 text-green-600" />}
              title="Verified Turfs"
              description="All turfs are verified with genuine reviews from real users. Quality guaranteed."
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">For Turf Owners</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <BenefitCard
                icon={<TrendingUp className="h-8 w-8 text-green-600" />}
                title="Increase Revenue"
                description="Reach more customers and maximize your turf utilization with our platform."
              />
              <BenefitCard
                icon={<Users className="h-8 w-8 text-green-600" />}
                title="Manage Easily"
                description="Powerful dashboard to manage bookings, availability, and customer interactions."
              />
            </div>
            <div className="text-center mt-6 sm:mt-8">
              <Link href="/auth/signup?role=turf_owner" className="block sm:inline-block">
                <Button size="lg" className="w-full sm:w-auto min-h-[48px]">
                  Register Your Turf
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-4">
            Join thousands of users already booking turfs on our platform
          </p>
          <Link href="/auth/signup" className="block sm:inline-block max-w-sm mx-auto sm:max-w-none">
            <Button size="lg" className="w-full sm:w-auto min-h-[48px]">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </div>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
