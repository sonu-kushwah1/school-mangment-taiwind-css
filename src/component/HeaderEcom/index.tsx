// components/Header.tsx
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600">ShopEase</h1>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-indigo-600">
            Products
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-indigo-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-indigo-600">
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;