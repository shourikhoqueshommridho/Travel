
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Pencil,
  RefreshCw,
  Save,
  Star,
  Trash2,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import {
  API_URL,
  deleteDestination,
  getDestination,
  updateDestination,
  type Destination,
} from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";

type DetailState = "loading" | "ready" | "notfound" | "error";

const backLinkClassName =
  "inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-cyan-700";

const inclusionLines = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
] as const;

// All edit form inputs now have a solid white background.
const editFieldClassName =
  "h-11 w-full border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-cyan-500";

function EditDestinationForm({
  destination,
  onUpdated,
  onCancel,
}: {
  destination: Destination;
  onUpdated: (updated: Destination) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState({
    name: destination.name,
    country: destination.country,
    category: destination.category,
    price: String(destination.price),
    duration: destination.duration,
    departureDate: destination.departureDate,
    imageUrl: destination.imageUrl,
    description: destination.description,
  });

  const [saving, setSaving] = useState(false);

  const setValue = (key: keyof typeof values, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving) return;

    setSaving(true);

    try {
      const updated = await updateDestination(destination._id, {
        name: values.name,
        country: values.country,
        category: values.category,
        price: Number(values.price),
        duration: values.duration,
        departureDate: values.departureDate,
        imageUrl: values.imageUrl,
        description: values.description,
        highlights: destination.highlights,
      });

      toast.add({
        type: "success",
        title: "Travel package updated",
        description: `“${updated.name}” was saved successfully.`,
        timeout: 5000,
      });

      onUpdated(updated);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

      toast.add({
        type: "error",
        title: "Update failed",
        description: message,
      });

      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4 bg-white">
      <div>
        <Label
          htmlFor="edit-name"
          className="text-[15px] font-semibold text-gray-900"
        >
          Destination Name
        </Label>

        <Input
          id="edit-name"
          required
          value={values.name}
          onChange={(event) => setValue("name", event.target.value)}
          placeholder="Bali Paradise"
          className={`mt-2 ${editFieldClassName}`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label
            htmlFor="edit-country"
            className="text-[15px] font-semibold text-gray-900"
          >
            Country
          </Label>

          <Input
            id="edit-country"
            required
            value={values.country}
            onChange={(event) => setValue("country", event.target.value)}
            placeholder="Indonesia"
            className={`mt-2 ${editFieldClassName}`}
          />
        </div>

        <div>
          <Label
            htmlFor="edit-category"
            className="text-[15px] font-semibold text-gray-900"
          >
            Category
          </Label>

          <Select
            value={values.category}
            onValueChange={(value) => setValue("category", value ?? "")}
          >
            <SelectTrigger
              id="edit-category"
              className="mt-2 h-11 w-full justify-between border-gray-200 bg-white text-gray-900 data-placeholder:text-gray-400"
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent className="z-[70] border border-gray-200 bg-white text-gray-900 shadow-xl">
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label
            htmlFor="edit-price"
            className="text-[15px] font-semibold text-gray-900"
          >
            Price (USD)
          </Label>

          <Input
            id="edit-price"
            required
            type="number"
            min="1"
            value={values.price}
            onChange={(event) => setValue("price", event.target.value)}
            placeholder="e.g., 1299"
            className={`mt-2 ${editFieldClassName}`}
          />
        </div>

        <div>
          <Label
            htmlFor="edit-duration"
            className="text-[15px] font-semibold text-gray-900"
          >
            Duration
          </Label>

          <Input
            id="edit-duration"
            required
            value={values.duration}
            onChange={(event) => setValue("duration", event.target.value)}
            placeholder="e.g., 7 Days/6 Nights"
            className={`mt-2 ${editFieldClassName}`}
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="edit-departure"
          className="text-[15px] font-semibold text-gray-900"
        >
          Departure Date
        </Label>

        <Input
          id="edit-departure"
          required
          type="date"
          value={values.departureDate}
          onChange={(event) => setValue("departureDate", event.target.value)}
          className={`mt-2 ${editFieldClassName}`}
        />
      </div>

      <div>
        <Label
          htmlFor="edit-image"
          className="text-[15px] font-semibold text-gray-900"
        >
          Image URL
        </Label>

        <Input
          id="edit-image"
          required
          type="url"
          value={values.imageUrl}
          onChange={(event) => setValue("imageUrl", event.target.value)}
          placeholder="https://example.com/image.jpg"
          className={`mt-2 ${editFieldClassName}`}
        />
      </div>

      <div>
        <Label
          htmlFor="edit-description"
          className="text-[15px] font-semibold text-gray-900"
        >
          Description
        </Label>

        <Textarea
          id="edit-description"
          required
          value={values.description}
          onChange={(event) => setValue("description", event.target.value)}
          placeholder="Describe the travel experience..."
          className="mt-2 min-h-32 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-cyan-500"
        />
      </div>

      <DialogFooter className="mt-2 flex-row gap-3 border-t border-gray-100 bg-white pt-5">
        <Button
          type="button"
          variant="outline"
          disabled={saving}
          onClick={onCancel}
          className="h-11 gap-2 border-gray-300 bg-white px-6 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        >
          <XIcon className="h-4 w-4" />
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={saving}
          className="h-11 gap-2 bg-cyan-600 px-5 text-white hover:bg-cyan-700"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function DestinationDetails({ id }: { id: string }) {
  const router = useRouter();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [state, setState] = useState<DetailState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadDestination = useCallback(async () => {
    setState("loading");
    setErrorMessage("");

    try {
      const data = await getDestination(id);

      if (data === null) {
        setState("notfound");
        return;
      }

      setDestination(data);
      setState("ready");
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }, [id]);

  useEffect(() => {
    void loadDestination();
  }, [loadDestination]);

  function handleBookNow() {
    toast.add({
      type: "info",
      title: "Booking is not available yet",
      description: "The booking flow is coming soon for this destination.",
      timeout: 5000,
    });
  }

  async function handleConfirmDelete() {
    if (!destination || deleting) return;

    setDeleting(true);

    try {
      await deleteDestination(destination._id);

      toast.add({
        type: "success",
        title: "Travel package deleted",
        description: `“${destination.name}” was permanently removed.`,
        timeout: 5000,
      });

      setDeleteOpen(false);
      router.replace("/destinations");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

      toast.add({
        type: "error",
        title: "Delete failed",
        description: message,
      });

      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/destinations" className={backLinkClassName}>
          <ArrowLeft className="h-4 w-4" />
          Back to Destinations
        </Link>

        {state === "ready" && destination && (
          <div className="flex items-center gap-4">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(true)}
                className="h-10 gap-2 border-gray-300 bg-white px-4 text-gray-900 hover:bg-gray-50 hover:text-gray-900"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>

              <DialogContent className="z-50 max-w-lg gap-4 border border-gray-200 bg-white p-6 text-gray-900 opacity-100 shadow-2xl sm:max-w-[560px]">
                <DialogHeader className="space-y-1 bg-white text-left">
                  <DialogTitle className="font-[family-name:var(--font-playfair)] text-2xl text-gray-900">
                    Update Travel Package
                  </DialogTitle>

                  <DialogDescription className="bg-white text-gray-600">
                    Make changes to the travel package details below
                  </DialogDescription>
                </DialogHeader>

                {editOpen && (
                  <EditDestinationForm
                    destination={destination}
                    onUpdated={(updated) => {
                      setDestination(updated);
                      setEditOpen(false);
                    }}
                    onCancel={() => setEditOpen(false)}
                  />
                )}
              </DialogContent>
            </Dialog>

            <AlertDialog
              open={deleteOpen}
              onOpenChange={(open) => {
                if (!deleting) {
                  setDeleteOpen(open);
                }
              }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteOpen(true)}
                disabled={deleting}
                className="h-10 gap-2 border-red-500 bg-white px-4 text-red-600 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>

              <AlertDialogContent className="z-50 border border-gray-200 bg-white p-6 text-gray-900 opacity-100 shadow-2xl">
                <button
                  type="button"
                  disabled={deleting}
                  aria-label="Close"
                  onClick={() => setDeleteOpen(false)}
                  className="absolute right-3 top-3 text-gray-400 transition-colors hover:text-gray-700 disabled:opacity-50"
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>

                <AlertDialogHeader className="bg-white">
                  <AlertDialogMedia className="bg-red-50 text-red-600">
                    <TriangleAlertIcon />
                  </AlertDialogMedia>

                  <AlertDialogTitle className="font-[family-name:var(--font-playfair)] text-xl font-medium text-gray-900">
                    Delete Travel Package
                  </AlertDialogTitle>

                  <AlertDialogDescription className="text-sm leading-relaxed text-gray-600">
                    Are you sure you want to delete{" "}
                    <b className="font-semibold text-gray-900">
                      ‘{destination.name}’
                    </b>
                    ? This action cannot be undone and will permanently remove
                    this travel package from the system.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="gap-3 bg-white">
                  <AlertDialogCancel
                    disabled={deleting}
                    className="h-11 border-gray-200 bg-white px-6 text-gray-900 hover:bg-gray-50"
                  >
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    disabled={deleting}
                    onClick={() => void handleConfirmDelete()}
                    className="h-11 gap-2 border-red-500 bg-red-500 px-5 text-white hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                    {deleting ? "Deleting..." : "Delete Package"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      {state === "notfound" && (
        <div className="mt-16" role="status">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-gray-900">
            Destination not found
          </h1>

          <p className="mt-3 max-w-md text-gray-600">
            The destination you are looking for does not exist or may have been
            deleted.
          </p>

          <Link
            href="/destinations"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase text-cyan-700 underline underline-offset-4 hover:text-cyan-900"
          >
            Explore all destinations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {state === "error" && (
        <div className="mt-10 flex flex-col items-start gap-4" role="alert">
          <h1 className="text-2xl font-semibold text-gray-900">
            Something went wrong
          </h1>

          <p className="text-sm text-red-600">{errorMessage}</p>

          <p className="text-xs text-gray-500">
            Tried API:{" "}
            <code className="bg-gray-100 px-1 py-0.5">
              {API_URL}/destinations/{id}
            </code>
          </p>

          <button
            type="button"
            onClick={() => void loadDestination()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 underline underline-offset-4 hover:text-cyan-900"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      )}

      {state === "loading" && (
        <div aria-hidden="true">
          <div className="mt-8 h-[320px] w-full animate-pulse bg-gray-200 sm:h-[420px] lg:h-[440px]" />
          <div className="mt-8 border-t border-gray-200" />

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="h-4 w-28 animate-pulse bg-gray-200" />
              <div className="mt-4 h-12 w-64 animate-pulse bg-gray-200" />

              <div className="mt-4 flex gap-6">
                <div className="h-5 w-36 animate-pulse bg-gray-200" />
                <div className="h-5 w-40 animate-pulse bg-gray-200" />
              </div>

              <div className="mt-10 h-8 w-32 animate-pulse bg-gray-200" />
              <div className="mt-4 h-4 w-full animate-pulse bg-gray-200" />
              <div className="mt-2 h-4 w-4/5 animate-pulse bg-gray-200" />
              <div className="mt-2 h-4 w-3/5 animate-pulse bg-gray-200" />
            </div>

            <div className="h-80 animate-pulse border border-gray-200" />
          </div>
        </div>
      )}

      {state === "ready" && destination && (
        <div className="mt-8">
          <div className="relative h-[320px] w-full sm:h-[420px] lg:h-[440px]">
            {destination.imageUrl ? (
              <Image
                src={destination.imageUrl}
                alt={destination.name}
                fill
                priority
                sizes="(max-width: 639px) 100vw, (max-width: 1279px) 100vw, 1280px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
          </div>

          <div className="mt-8 border-t border-gray-200" />

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {destination.country}
                </span>

                {destination.category && (
                  <span className="border border-gray-300 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-gray-600">
                    {destination.category}
                  </span>
                )}
              </div>

              <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-4xl text-gray-900 sm:text-5xl">
                {destination.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
                {destination.rating !== undefined && (
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-green-500 text-green-500" />
                    <span className="font-bold text-gray-900">
                      {destination.rating.toFixed(1)}
                    </span>
                  </span>
                )}

                <span className="inline-flex items-center gap-2 font-semibold text-gray-900">
                  <CalendarDays className="h-4 w-4" />
                  {destination.duration}
                </span>
              </div>

              {destination.description && (
                <div className="mt-10">
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-gray-900 sm:text-3xl">
                    Overview
                  </h2>

                  <p className="mt-3 leading-relaxed text-gray-600">
                    {destination.description}
                  </p>
                </div>
              )}

              {destination.highlights && destination.highlights.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-gray-900 sm:text-3xl">
                    Highlights
                  </h2>

                  <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {destination.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2.5 text-sm text-gray-700"
                      >
                        <Check className="h-4 w-4 shrink-0 text-green-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="self-start border border-gray-200 bg-white p-6 lg:sticky lg:top-24">
              <p className="text-sm text-gray-500">Starting from</p>

              <p className="mt-1 text-4xl font-bold text-cyan-600">
                ${destination.price.toLocaleString("en-US")}
              </p>

              <p className="mt-1 text-sm text-gray-500">per person</p>

              <label htmlFor="departure-date" className="mt-6 block">
                <span className="sr-only">Departure date</span>

                <input
                  id="departure-date"
                  type="date"
                  defaultValue={destination.departureDate}
                  className="h-11 w-full border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/30"
                />
              </label>

              <Button
                type="button"
                onClick={handleBookNow}
                className="mt-6 h-11 w-full gap-2 bg-cyan-600 hover:bg-cyan-700"
              >
                Book Now
                <ArrowRight className="h-4 w-4" />
              </Button>

              <ul className="mt-6 space-y-2.5">
                {inclusionLines.map((line) => (
                  <li
                    key={line}
                    className="flex items-center gap-2.5 text-sm text-gray-700"
                  >
                    <Check className="h-4 w-4 shrink-0 text-green-500" />
                    {line}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
