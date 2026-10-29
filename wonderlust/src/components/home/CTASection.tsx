
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-cover bg-center px-4 py-16 sm:min-h-[400px] sm:py-20"
      style={{
        backgroundImage: "url('/img/CTA.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Ready To Start Your Journey?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-base md:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Link
          href="/destinations"
          className="mx-auto mt-10 inline-flex min-h-14 items-center justify-center gap-6 bg-white px-6 py-4 text-sm font-medium text-black transition-colors duration-300 hover:bg-orange-500 hover:text-white sm:px-8"
        >
          <span>BOOK YOUR TRIP TODAY</span>
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
