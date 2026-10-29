"use client";

import { useState, type FormEvent } from "react";
import { PackagePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_URL } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";

const initialValues = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

type TravelPackageForm = typeof initialValues;

interface AddDestinationResponse {
  message?: string;
  insertedId?: string;
}

const textFieldClassName =
  "mt-2 h-11 w-full border-gray-200 bg-gray-50 text-gray-700 placeholder:text-gray-400";

export default function AddDestinationPage() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const setValue = (key: keyof typeof initialValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

 
async function handleAdd(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const res = await fetch(`${API_URL}/add-destination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        price: Number(values.price),
      }),
    });

    // Response JSON কি না পরীক্ষা করো
    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      const responseText = await res.text();

      console.error("Expected JSON but received:", responseText);

      throw new Error(
        "Backend থেকে JSON আসেনি। API URL এবং backend route চেক করো।",
      );
    }

    const data = (await res.json()) as AddDestinationResponse;

    if (!res.ok) {
      throw new Error(data.message || "Failed to add destination");
    }

    console.log("Destination added:", data);
    setSuccess("Travel package added successfully!");
    setValues(initialValues);
  } catch (err) {
    console.error("Add destination error:", err);

    setError(
      err instanceof Error ? err.message : "Something went wrong.",
    );
  } finally {
    setLoading(false);
  }
}


  function handleCancel() {
    setValues(initialValues);
    setError("");
    setSuccess("");
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-gray-900 sm:text-5xl lg:text-6xl">
          Add New Travel Package
        </h1>

        <section className="mx-auto mt-16 max-w-3xl border border-gray-200 bg-white px-6 py-10 sm:px-12">
          <form onSubmit={handleAdd} className="space-y-6">
            {/* Destination Name */}
            <div>
              <Label
                htmlFor="name"
                className="text-[15px] font-semibold text-gray-900"
              >
                Destination Name
              </Label>

              <Input
                id="name"
                required
                value={values.name}
                onChange={(event) => setValue("name", event.target.value)}
                placeholder="Bali Paradise"
                className={textFieldClassName}
              />
            </div>

            {/* Country + Category */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label
                  htmlFor="country"
                  className="text-[15px] font-semibold text-gray-900"
                >
                  Country
                </Label>

                <Input
                  id="country"
                  required
                  value={values.country}
                  onChange={(event) => setValue("country", event.target.value)}
                  placeholder="Indonesia"
                  className={textFieldClassName}
                />
              </div>

              <div>
                <Label
                  htmlFor="category"
                  className="text-[15px] font-semibold text-gray-900"
                >
                  Category
                </Label>

                <Select
                  value={values.category}
                  onValueChange={(value) =>
                    setValue("category", value ?? "")
                  }
                  required
                >
                  <SelectTrigger
                    id="category"
                    className="mt-2 h-11 w-full border-gray-200 bg-white text-gray-900 hover:bg-white focus:bg-white data-[placeholder]:text-gray-400"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent
                    className="z-[100] min-w-[220px] !border-gray-200 !bg-white !opacity-100 text-gray-900 shadow-lg"
                  >
                    {CATEGORIES.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="bg-white text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price + Duration */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label
                  htmlFor="price"
                  className="text-[15px] font-semibold text-gray-900"
                >
                  Price (USD)
                </Label>

                <Input
                  id="price"
                  required
                  type="number"
                  min="1"
                  value={values.price}
                  onChange={(event) => setValue("price", event.target.value)}
                  placeholder="e.g., 1299"
                  className={textFieldClassName}
                />
              </div>

              <div>
                <Label
                  htmlFor="duration"
                  className="text-[15px] font-semibold text-gray-900"
                >
                  Duration
                </Label>

                <Input
                  id="duration"
                  required
                  value={values.duration}
                  onChange={(event) =>
                    setValue("duration", event.target.value)
                  }
                  placeholder="e.g., 7 Days/6 Nights"
                  className={textFieldClassName}
                />
              </div>
            </div>

            {/* Departure Date */}
            <div>
              <Label
                htmlFor="departureDate"
                className="text-[15px] font-semibold text-gray-900"
              >
                Departure Date
              </Label>

              <Input
                id="departureDate"
                required
                type="date"
                value={values.departureDate}
                onChange={(event) =>
                  setValue("departureDate", event.target.value)
                }
                className={textFieldClassName}
              />
            </div>

            {/* Image URL */}
            <div>
              <Label
                htmlFor="imageUrl"
                className="text-[15px] font-semibold text-gray-900"
              >
                Image URL
              </Label>

              <Input
                id="imageUrl"
                required
                type="url"
                value={values.imageUrl}
                onChange={(event) => setValue("imageUrl", event.target.value)}
                placeholder="https://example.com/image.jpg"
                className={textFieldClassName}
              />
            </div>

            {/* Description */}
            <div>
              <Label
                htmlFor="description"
                className="text-[15px] font-semibold text-gray-900"
              >
                Description
              </Label>

              <Textarea
                id="description"
                required
                value={values.description}
                onChange={(event) =>
                  setValue("description", event.target.value)
                }
                placeholder="Describe the travel experience..."
                className="mt-2 min-h-36 w-full border-gray-200 bg-gray-50 text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* API feedback */}
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            {success && (
              <p role="status" className="text-sm text-green-600">
                {success}
              </p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-2">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                disabled={loading}
                className="h-11 gap-2 border-red-500 px-6 text-red-600 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 gap-2 bg-cyan-600 px-6 hover:bg-cyan-700"
              >
                <PackagePlus className="h-4 w-4" />
                {loading ? "Adding..." : "Add Travel Package"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
