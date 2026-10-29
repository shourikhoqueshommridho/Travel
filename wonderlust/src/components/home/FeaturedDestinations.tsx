
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  MapPin,
  Star,
} from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Bali Paradise",
    country: "Bali, Indonesia",
    price: 899,
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    image: "/img/image6.png",
  },
  {
    id: 2,
    name: "Maldives Escape",
    country: "Maldives",
    price: 1299,
    duration: "4 Days / 3 Nights",
    rating: 4.8,
    image: "/img/image5.png",
  },
  {
    id: 3,
    name: "Swiss Alps Adventure",
    country: "Switzerland",
    price: 1599,
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    image: "/img/image4.png",
  },
  {
    id: 4,
    name: "Phuket Beach",
    country: "Phuket, Thailand",
    price: 749,
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    image: "/img/image2.png",
  },
  {
    id: 5,
    name: "Santorini Escape",
    country: "Santorini, Greece",
    price: 1199,
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    image: "/img/image1.png",
  },
];

export default function FeaturedDestinations() {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleDestinations = Array.from(
    { length: 3 },
    (_, index) =>
      destinations[(activeIndex + index) % destinations.length],
  );

  function handlePrevious() {
    setActiveIndex(
      (current) =>
        (current - 1 + destinations.length) % destinations.length,
    );
  }

  function handleNext() {
    setActiveIndex(
      (current) => (current + 1) % destinations.length,
    );
  }

  return (
    <section
      id="destinations"
      className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Explore the World
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Featured Destinations
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Discover amazing places and plan your next
              unforgettable journey.
            </p>
          </div>

          {/* Carousel controls */}
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-sm font-medium text-gray-600">
              {activeIndex + 1}
              <span className="mx-1 text-gray-400">/</span>
              {destinations.length}
            </span>

            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous destinations"
              className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-700 transition hover:border-cyan-600 hover:bg-cyan-600 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next destinations"
              className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-700 transition hover:border-cyan-600 hover:bg-cyan-600 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Destination cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination) => (
            <article
              key={destination.id}
              className="group overflow-hidden border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* Destination image */}
              <div className="relative h-56 overflow-hidden sm:h-60">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Rating badge */}
                <div className="absolute right-3 top-3 flex items-center gap-1 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {destination.rating}
                </div>
              </div>

              {/* Card details */}
              <div className="p-5">
                <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin className="h-3.5 w-3.5 text-cyan-600" />
                  {destination.country}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-cyan-700">
                  {destination.name}
                </h3>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-500">
                      Starting from
                    </p>

                    <p className="mt-1 text-xl font-bold text-cyan-700">
                      ${destination.price}
                      <span className="ml-1 text-xs font-normal text-gray-500">
                        / person
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock3 className="h-4 w-4" />
                    <span>{destination.duration}</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <Link
                    href={`/destinations/${destination.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-900"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
