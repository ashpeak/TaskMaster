import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MyThemeProvider from "@/provider/MyThemeProvider";
import MyQueryClientProvider from "@/provider/MyQueryClientProvider";
import { Toaster } from "@/components/ui/toaster";
import {
  ClerkProvider,
} from '@clerk/nextjs';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Personal Task Management System
  title: "EffiTask - Personal Task Management System",
  description: "Boost your productivity with TaskMaster, the all-in-one personal task management system featuring a calendar view, task tracker, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <MyThemeProvider>
            <MyQueryClientProvider>
              {children}
            </MyQueryClientProvider>
          </MyThemeProvider>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
