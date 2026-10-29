
"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("3");
  const [budget, setBudget] = useState("500-3000");
  const [people, setPeople] = useState("5-10");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchData = {
      location,
      duration,
      budget,
      people,
    };

    console.log("Travel search:", searchData);
  }

  return (
    <section className="relative z-20 -mt-1 w-full">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 gap-px bg-white/30 sm:grid-cols-2 lg:grid-cols-[1.15fr_1.15fr_1.15fr_1.15fr_0.75fr]"
      >
        {/* Location */}
        <div className="flex min-h-[68px] flex-col justify-center bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
          <label
            htmlFor="location"
            className="mb-1 text-xs font-medium"
          >
            Location
          </label>

          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-white/70" />

            <Input
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Address, City or Zip"
              className="h-6 border-0 bg-transparent px-0 text-xs text-white shadow-none placeholder:text-white/65 focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Date / Duration */}
        <div className="flex min-h-[68px] flex-col justify-center bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
          <label
            htmlFor="duration"
            className="mb-1 text-xs font-medium"
          >
            Date/Duration
          </label>

          <Select value={duration} onValueChange={(value) => setDuration(value ?? "1")}>
            <SelectTrigger
              id="duration"
              className="h-6 w-full border-0 bg-transparent px-0 text-xs text-white shadow-none focus:ring-0"
            >
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">Anytime / 1 Day</SelectItem>
              <SelectItem value="3">Anytime / 3 Days</SelectItem>
              <SelectItem value="7">Anytime / 7 Days</SelectItem>
              <SelectItem value="14">Anytime / 14 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div className="flex min-h-[68px] flex-col justify-center bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
          <label
            htmlFor="budget"
            className="mb-1 text-xs font-medium"
          >
            Budget
          </label>

          <Select value={budget} onValueChange={(value) => setBudget(value ?? "500-3000")}>
            <SelectTrigger
              id="budget"
              className="h-6 w-full border-0 bg-transparent px-0 text-xs text-white shadow-none focus:ring-0"
            >
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="100-500">$100-$500</SelectItem>
              <SelectItem value="500-3000">$500-$3000</SelectItem>
              <SelectItem value="3000-5000">$3000-$5000</SelectItem>
              <SelectItem value="5000+">$5000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* People */}
        <div className="flex min-h-[68px] flex-col justify-center bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
          <label
            htmlFor="people"
            className="mb-1 text-xs font-medium"
          >
            People
          </label>

          <Select value={people} onValueChange={(value) => setPeople(value ?? "5-10")}>
            <SelectTrigger
              id="people"
              className="h-6 w-full border-0 bg-transparent px-0 text-xs text-white shadow-none focus:ring-0"
            >
              <SelectValue placeholder="Select people" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1-2">1-2 People</SelectItem>
              <SelectItem value="3-5">3-5 People</SelectItem>
              <SelectItem value="5-10">5-10 People</SelectItem>
              <SelectItem value="10+">10+ People</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search button */}
        <Button
          type="submit"
          className="h-full min-h-[58px] rounded-none bg-cyan-600 text-sm font-semibold text-white hover:bg-cyan-700"
        >
          Search
          <Search className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </section>
  );
}
