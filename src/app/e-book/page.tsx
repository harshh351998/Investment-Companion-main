'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EbookSection from '@/components/ebook/EbookSection';

export default function EbookPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-20">
        <EbookSection />
      </div>
      <Footer />
    </main>
  );
}

