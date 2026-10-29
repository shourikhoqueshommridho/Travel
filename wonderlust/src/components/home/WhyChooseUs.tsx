
import {
  BadgeCheck,
  Headphones,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Best Price Guarantee",
    description:
      "Enjoy amazing travel experiences at the best prices without compromising on quality.",
  },
  {
    icon: MapPinned,
    title: "Expert Travel Guides",
    description:
      "Explore the world with experienced guides who help you discover unforgettable places.",
  },
  {
    icon: ShieldCheck,
    title: "Easy & Secure Booking",
    description:
      "Book your dream vacation with a simple, secure, and hassle-free booking process.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Our friendly support team is always ready to help you throughout your journey.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Why Choose Wanderlust
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Making Your Travel Dreams Come True
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            We make every journey comfortable, memorable, and stress-free
            with services you can trust.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-5 flex size-14 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
