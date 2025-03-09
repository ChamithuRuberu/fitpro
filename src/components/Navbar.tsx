'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleProgramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/programs/create');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">FitPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleProgramClick}
              className="text-gray-700 hover:text-blue-600"
            >
              Programs
            </button>
            <Link href="/nutrition" className="text-gray-700 hover:text-blue-600">
              Nutrition
            </Link>
            <Link href="/trainers" className="text-gray-700 hover:text-blue-600">
              Trainers
            </Link>
            <Link href="/user-login" className="text-gray-700 hover:text-blue-600">
              Join Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6 text-gray-600" />
            ) : (
              <FiMenu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleProgramClick}
                className="text-left text-gray-700 hover:text-blue-600"
              >
                Programs
              </button>
              <Link
                href="/nutrition"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Nutrition
              </Link>
              <Link
                href="/trainers"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Trainers
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 