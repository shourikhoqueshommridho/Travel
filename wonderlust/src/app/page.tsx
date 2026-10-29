
import CTASection from "@/components/home/CTASection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import Hero from "@/components/home/Hero";
import Search from "@/components/home/Search";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
         <Search/>
        <FeaturedDestinations/>
        <WhyChooseUs/>
        <Testimonials/>
        <CTASection/>

      {/* Part 3: Search Bar will go here */}
    </main>
  );
}
