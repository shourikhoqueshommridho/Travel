
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-cover bg-center px-4 pb-16 pt-24 sm:min-h-[680px] lg:min-h-[720px]"
      style={{
        backgroundImage: "url('/img/Banner.png')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
        <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Discover Your
          <br />
          <span className="font-normal">Next Adventure</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
          Explore breathtaking destinations and create unforgettable
          memories with our curated travel experiences.
        </p>

        {/* CTA buttons */}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/destinations"
            className="inline-flex h-11 items-center justify-center bg-cyan-600 px-6 text-xs font-medium uppercase text-white transition-colors hover:bg-cyan-700"
          >
            Explore Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href="/destinations"
            className="inline-flex h-11 items-center justify-center border border-white/80 bg-white/10 px-6 text-xs font-medium uppercase text-white transition-colors hover:bg-white hover:text-gray-900"
          >
            View Destination
          </Link>
        </div>
      </div>
    </section>
  );
}
