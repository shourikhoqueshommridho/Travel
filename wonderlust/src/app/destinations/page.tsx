"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  RefreshCw,
  Star,
  Trash2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  API_URL,
  deleteDestination,
  getDestinations,
  type Destination,
} from "@/lib/api";

const PRICE_RANGES = [
  { value: "all", label: "Any Price" },
  { value: "under1000", label: "Under $1,000" },
  { value: "1000-2000", label: "$1,000 – $2,000" },
  { value: "2000-3000", label: "$2,000 – $3,000" },
  { value: "over3000", label: "Over $3,000" },
] as const;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
] as const;

const ALL_CATEGORY = "all";
const ALL_PRICE = "all";
const FEATURED_SORT = "featured";

type LoadState = "loading" | "error" | "ready";

const filterTriggerClassName =
  "h-14 w-full justify-between rounded-none border-0 text-gray-600 data-placeholder:uppercase data-placeholder:tracking-wide";

function DestinationCard({
  destination,
  busy,
  onConfirmDelete,
}: {
  destination: Destination;
  busy: boolean;
  onConfirmDelete: (destination: Destination) => Promise<boolean>;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deletingThis = busy && confirmOpen;

  async function handleConfirm() {
    const deleted = await onConfirmDelete(destination);
    if (deleted) {
      setConfirmOpen(false);
    }
  }

  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100 sm:h-60">
        {destination.imageUrl ? (
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}

        {/* Rating badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">
          {(destination.rating ?? 4.5).toFixed(1)}
          <Star className="h-3.5 w-3.5 fill-gray-900 text-gray-900" />
        </div>
      </div>

      {/* Card details */}
      <div className="bg-white p-5">
        {/* Country */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5" />
          {destination.country}
        </div>

        {/* Name + price */}
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-gray-900">
            {destination.name}
          </h3>
          <p className="whitespace-nowrap text-xl font-bold text-gray-900">
            ${destination.price.toLocaleString("en-US")}
            <span className="ml-0.5 text-xs font-normal text-gray-500">
              /Person
            </span>
          </p>
        </div>

        {/* Duration */}
        <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
          <CalendarDays className="h-3.5 w-3.5" />
          {destination.duration}
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <Link
            href={`/destinations/${destination._id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-cyan-700 underline underline-offset-4 transition-colors hover:text-cyan-900"
          >
            Book Now
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <AlertDialog
            open={confirmOpen}
            onOpenChange={(open) => {
              if (!deletingThis) {
                setConfirmOpen(open);
              }
            }}
          >
            <AlertDialogTrigger
              render={
                <button
                  type="button"
                  disabled={busy}
                  aria-label={`Delete ${destination.name}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                />
              }
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete “{destination.name}”?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  The destination will be permanently removed from the database.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={busy}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="outline"
                  disabled={busy}
                  onClick={() => void handleConfirm()}
                  className="border-red-600 bg-red-600 text-white hover:bg-red-700 hover:text-white"
                >
                  {deletingThis ? "Deleting..." : "Yes, delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </article>
  );
}

function DestinationCardSkeleton() {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="h-56 w-full animate-pulse bg-gray-200 sm:h-60" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-24 animate-pulse bg-gray-200" />
        <div className="flex items-baseline justify-between gap-3">
          <div className="h-7 w-40 animate-pulse bg-gray-200" />
          <div className="h-7 w-20 animate-pulse bg-gray-200" />
        </div>
        <div className="h-4 w-32 animate-pulse bg-gray-200" />
        <div className="h-4 w-24 animate-pulse bg-gray-200" />
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORY);
  const [priceRange, setPriceRange] = useState<string>(ALL_PRICE);
  const [sortBy, setSortBy] = useState<string>(FEATURED_SORT);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadDestinations = useCallback(async () => {
    setState("loading");
    setErrorMessage("");

    try {
      const data = await getDestinations();
      setDestinations(data);
      setState("ready");
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }, []);

  useEffect(() => {
    void loadDestinations();
  }, [loadDestinations]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(destinations.map((item) => item.category).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b)),
    [destinations]
  );

  const visibleDestinations = useMemo(() => {
    let result = [...destinations];

    if (category !== ALL_CATEGORY) {
      result = result.filter((item) => item.category === category);
    }

    if (priceRange !== ALL_PRICE) {
      result = result.filter((item) => {
        const price = Number(item.price) || 0;

        switch (priceRange) {
          case "under1000":
            return price < 1000;
          case "1000-2000":
            return price >= 1000 && price < 2000;
          case "2000-3000":
            return price >= 2000 && price < 3000;
          case "over3000":
            return price >= 3000;
          default:
            return true;
        }
      });
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [destinations, category, priceRange, sortBy]);

  function resetFilters() {
    setCategory(ALL_CATEGORY);
    setPriceRange(ALL_PRICE);
    setSortBy(FEATURED_SORT);
  }

  const handleConfirmDelete = useCallback(
    async (destination: Destination): Promise<boolean> => {
      if (deletingId !== null) {
        return false;
      }

      setDeletingId(destination._id);

      try {
        await deleteDestination(destination._id);

        setDestinations((prev) =>
          prev.filter((item) => item._id !== destination._id)
        );

        toast.add({
          type: "success",
          title: "Destination deleted",
          description: `“${destination.name}” was removed.`,
          timeout: 5000,
        });

        return true;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong.";

        toast.add({
          type: "error",
          title: "Delete failed",
          description: message,
        });

        return false;
      } finally {
        setDeletingId(null);
      }
    },
    [deletingId]
  );

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        {/* Heading */}
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-gray-900 sm:text-5xl lg:text-6xl">
          Explore All Destinations
        </h1>

        <p className="mt-4 text-base text-gray-500 sm:text-lg">
          Find your perfect travel experience from our curated collection
        </p>

        {/* Filters */}
        <div className="mt-10 grid divide-y divide-gray-300 border border-gray-300 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="border-gray-300">
            <Select
              value={category}
              onValueChange={(value) => setCategory(value ?? ALL_CATEGORY)}
            >
              <SelectTrigger
                className={filterTriggerClassName}
                aria-label="Filter by category"
              >
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                <SelectItem value={ALL_CATEGORY}>All Categories</SelectItem>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-gray-300">
            <Select
              value={priceRange}
              onValueChange={(value) => setPriceRange(value ?? ALL_PRICE)}
            >
              <SelectTrigger
                className={filterTriggerClassName}
                aria-label="Filter by price range"
              >
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                {PRICE_RANGES.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-gray-300">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value ?? FEATURED_SORT)}
            >
              <SelectTrigger
                className={filterTriggerClassName}
                aria-label="Sort destinations"
              >
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Count */}
        <p className="mt-6 text-gray-600">
          {state === "loading"
            ? "Loading destinations..."
            : `Showing ${visibleDestinations.length} destination${
                visibleDestinations.length === 1 ? "" : "s"
              }`}
        </p>

        {/* Error state */}
        {state === "error" && (
          <div className="mt-10 flex flex-col items-start gap-4" role="alert">
            <p className="text-sm text-red-600">{errorMessage}</p>
            <p className="text-xs text-gray-500">
              Tried API:{" "}
              <code className="bg-gray-100 px-1 py-0.5">
                {API_URL}/destinations
              </code>
            </p>
            <button
              type="button"
              onClick={() => void loadDestinations()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 underline underline-offset-4 hover:text-cyan-900"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {state === "loading" && (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <DestinationCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Destination cards */}
        {state === "ready" && visibleDestinations.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {visibleDestinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
                busy={deletingId !== null}
                onConfirmDelete={handleConfirmDelete}
              />
            ))}
          </div>
        )}

        {/* Empty database */}
        {state === "ready" && destinations.length === 0 && (
          <div className="mt-12">
            <p className="text-gray-600">No destinations found.</p>
            <Link
              href="/add-destination"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase text-cyan-700 underline underline-offset-4 hover:text-cyan-900"
            >
              Add your first package
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* No filter matches */}
        {state === "ready" &&
          destinations.length > 0 &&
          visibleDestinations.length === 0 && (
            <div className="mt-12">
              <p className="text-gray-600">
                No destinations match your filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-sm font-semibold text-cyan-700 underline underline-offset-4 hover:text-cyan-900"
              >
                Reset filters
              </button>
            </div>
          )}
      </div>
    </main>
  );
}