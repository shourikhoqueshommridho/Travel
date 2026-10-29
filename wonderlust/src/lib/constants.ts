// Destination categories shown in the Add and Edit travel package forms
// (matches the validation accepted by the backend)
export const CATEGORIES = [
  "Beach",
  "Mountain",
  "Adventure",
  "Cultural",
  "Luxury",
  "Cruise",
  "Wildlife",
] as const;

export type Category = (typeof CATEGORIES)[number];
