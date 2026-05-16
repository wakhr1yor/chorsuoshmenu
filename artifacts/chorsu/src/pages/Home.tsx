import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SignatureDishes } from "@/components/SignatureDishes";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { OurStory } from "@/components/OurStory";
import { LiveCooking } from "@/components/LiveCooking";
import { Gallery } from "@/components/Gallery";
import { Branches } from "@/components/Branches";
import { Testimonials } from "@/components/Testimonials";
import { Reservation } from "@/components/Reservation";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SignatureDishes />
        <WhyChooseUs />
        <OurStory />
        <LiveCooking />
        <Gallery />
        <Branches />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </div>
  );
}
