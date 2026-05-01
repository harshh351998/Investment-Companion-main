import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CoursesSection from '@/components/courses/CoursesSection';
import EbookSection from '@/components/ebook/EbookSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <CoursesSection />
      <EbookSection />
      <Footer />
    </main>
  );
}
