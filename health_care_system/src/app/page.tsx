"use client"
import Link from 'next/link';
import { Stethoscope, CalendarCheck, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Landingpage/Header';
import { FaStethoscope } from 'react-icons/fa';


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
     <Header/>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-24 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">Your Health, Our Priority</h1>
            <p className="text-xl mb-8 italic">Book appointments with expert doctors in just a few clicks.</p>
            <Link href="/Login">
              <Button variant="secondary" className="px-8 py-4 rounded-full shadow-lg">Get Started</Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: <Stethoscope />, title: "Find Your Doctor", desc: "Search by specialty, experience, or availability." },
                { icon: <CalendarCheck />, title: "Book Appointment", desc: "Choose your preferred date and time." },
                { icon: <Users />, title: "Consult Online", desc: "Virtual or in-person consultations available." }
              ].map((item, index) => (
                <div key={index} className="transform transition duration-300 hover:scale-105">
                  <Card className="p-6">
                    <CardContent className="flex flex-col items-center">
                      <div className="text-blue-600 w-10 h-10 mb-4">{item.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
             <FaStethoscope className="text-blue-600 w-8 h-8" />
            <h4 className="text-xl font-semibold mb-4">HealthConnect </h4>
            <p className="text-gray-400">Making healthcare accessible and convenient for everyone.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">support@healthconnectpro.com</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          © {new Date().getFullYear()} HealthConnect Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}