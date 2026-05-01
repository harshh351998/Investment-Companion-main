import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Investment Companion",
  description: "Learn about Investment Companion, our mission to make financial education accessible, and our founder Harsh Mendapara",
  keywords: "about investment companion, financial education, investment platform, financial literacy, Harsh Mendapara",
};

export default function AboutLayout({
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

