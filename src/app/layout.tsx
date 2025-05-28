import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "../components/AnimatedBackground";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExamPro - Online Mock Test Platform",
  description: "Professional certification preparation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AnimatedBackground>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20 pb-10 px-4 md:px-8">
            
              {children}
              </main>
            <Footer />
          </div>
        </AnimatedBackground>
      </body>
      </html>
    </ClerkProvider>
  );
}