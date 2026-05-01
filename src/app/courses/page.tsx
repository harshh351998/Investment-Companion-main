'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CoursesList from '@/components/courses/CoursesList';

export default function CoursesPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16">
        <CoursesList showAll={true} showBackButton={true} />
      </div>
      <Footer />
    </main>
  );
} 