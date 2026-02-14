'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { MapPin, User, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';

export function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <MapPin className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-gray-900">TurfBooking</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm text-gray-600 hidden lg:block">
                  Hello, <span className="font-semibold">{session.user.name}</span>
                </span>
                <Link href={`/dashboard/${session.user.role.toLowerCase()}`}>
                  <Button variant="outline" size="sm">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t animate-in slide-in-from-top-5 duration-300">
            {session ? (
              <>
                <div className="px-2 py-2 text-sm text-gray-600 bg-gray-50 rounded-md">
                  Hello, <span className="font-semibold">{session.user.name}</span>
                </div>
                <Link 
                  href={`/dashboard/${session.user.role.toLowerCase()}`}
                  onClick={closeMobileMenu}
                  className="block"
                >
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <LayoutDashboard className="h-5 w-5 mr-3" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="lg"
                  onClick={() => {
                    closeMobileMenu();
                    signOut({ callbackUrl: '/' });
                  }}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" onClick={closeMobileMenu} className="block">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <User className="h-5 w-5 mr-3" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={closeMobileMenu} className="block">
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
