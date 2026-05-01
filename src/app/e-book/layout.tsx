import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Book | Investment Companion",
  description: "Get your copy of the Ultimate Guide to Financial Freedom - comprehensive e-book with expert investment strategies and financial planning advice",
  keywords: "financial freedom ebook, investment guide, financial planning, wealth building, investment strategies",
};

export default function EbookLayout({
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

