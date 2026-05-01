import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | Investment Companion",
  description: "Explore our complete catalog of investment and finance courses to help you achieve financial independence",
  keywords: "investment courses, finance courses, trading courses, stock market, cryptocurrency, real estate",
};

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
} 