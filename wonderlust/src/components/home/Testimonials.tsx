/* eslint-disable @next/next/no-img-element */

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Adventure Traveler",
    image: "https://i.pravatar.cc/120?img=47",
    rating: 5,
    review:
      "Wanderlust made our Bali trip absolutely unforgettable. Everything was well organized, and the experience exceeded our expectations!",
    location: "Bali, Indonesia",
  },
  {
    name: "Michael Chen",
    role: "Frequent Traveler",
    image: "https://i.pravatar.cc/120?img=12",
    rating: 5,
    review:
      "The booking process was simple, the prices were reasonable, and the support team was incredibly helpful throughout our trip.",
    location: "Maldives",
  },
  {
    name: "Emily Davis",
    role: "Family Traveler",
    image: "https://i.pravatar.cc/120?img=44",
    rating: 5,
    review:
      "We had an amazing family vacation! The recommendations were excellent, and every detail was handled with care.",
    location: "Switzerland",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Testimonials
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Travelers Say
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Real experiences inspire extraordinary journeys.
            Discover what our travelers love about Wanderlust.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
            >
              <Quote
                size={34}
                className="mb-5 text-orange-200"
                fill="currentColor"
              />

              {/* Star Rating */}
              <div
                className="mb-4 flex items-center gap-1"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: testimonial.rating }, (_, index) => (
                  <Star
                    key={index}
                    size={17}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="min-h-28 text-sm leading-7 text-gray-600">
                “{testimonial.review}”
              </p>

              <div className="my-6 border-t border-gray-100" />

              {/* Traveler Details */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={52}
                  height={52}
                  loading="lazy"
                  className="size-13 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {testimonial.role}
                  </p>

                  <p className="mt-1 text-xs font-medium text-orange-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
