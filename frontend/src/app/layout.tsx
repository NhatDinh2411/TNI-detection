'use client';
import React from 'react';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html >
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
          <Header />
          <main className="w-full max-w-6xl flex-grow">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>


  );
}