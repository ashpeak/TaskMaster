import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";;
import Community from "@/components/Community";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <AmbientBackground />
      <Header />
      <main className="flex-grow z-10">
        <Hero />
        <Features />
        <Testimonials />
        <Community />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}