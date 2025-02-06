import { Button } from "@/components/ui/button"
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 z-10">
            <h1 className="text-4xl font-bold text-foreground mb-4">Master Your Tasks, Elevate Your Productivity</h1>
            <p className="text-xl text-muted-foreground mb-8">
              TaskMaster: Your all-in-one personal task management system. Stay organized, focused, and achieve more
              with our intuitive calendar view and smart task tracking.
            </p>
            <div className="flex space-x-4">
              <SignInButton>
                <Button size="lg">Get Started</Button>
              </SignInButton>
              <Button size="lg" variant="outline">
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative z-10">
            <div className="relative flex items-center justify-center md:justify-end w-full h-[400px]">
              <Image
                // src="/images/placeholder.svg"
                src="/images/hero-image.svg"
                alt="TaskMaster Dashboard"
                width={400}
                height={400}
                className="rounded-lg shadow-lg border border-secondary"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>
    </div>
  )
}

