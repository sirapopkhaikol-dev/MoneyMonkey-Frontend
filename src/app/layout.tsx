import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import GoogleProvider from "@/components/providers/googleProvider";
import { AuthProvider } from "@/components/contexts/authContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoneyMonkey",
  description: "AI-powered inflation forecasting",
};

export default function RootLayout({ children }: LayoutProps<"/">) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <GoogleProvider>
          <AuthProvider>
            <NavBar/>
            {children}
          </AuthProvider>
        </GoogleProvider>
      </body>
    </html>
  );
}
