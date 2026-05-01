import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Investment Companion",
  description: "Get in touch with Investment Companion. Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  keywords: "contact investment companion, support, customer service, financial education support",
};

export default function ContactLayout({
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

