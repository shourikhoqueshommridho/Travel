// Express API base URL — NOT the Next.js frontend URL
export const API_URL =
  (process.env.NEXT_PUBLIC_API_URL as string | undefined) ??
  "http://localhost:8000";

// A travel destination document as stored in the MongoDB "destinations" collection
export interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
  highlights?: string[];
  createdAt?: string;
}

interface ApiErrorBody {
  message?: unknown;
}

function extractErrorMessage(body: unknown, fallback: string): string {
  if (
    body !== null &&
    typeof body === "object" &&
    "message" in body &&
    typeof (body as ApiErrorBody).message === "string"
  ) {
    return (body as ApiErrorBody).message as string;
  }
  return fallback;
}

/**
 * Fetch all destinations from the Express API.
 * Throws an Error with a readable message on any failure (network, non-JSON, HTTP error).
 */
export async function getDestinations(): Promise<Destination[]> {
  const response = await fetch(`${API_URL}/destinations`, {
    headers: { Accept: "application/json" },
  });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    const text = await response.text().catch(() => "");
    console.error(
      "Expected JSON but got:",
      text.slice(0, 200) || "<empty body>"
    );
    throw new Error(
      "The API did not return JSON. Check API URL and backend routes."
    );
  }

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(body, `API error (HTTP ${response.status})`)
    );
  }

  if (!Array.isArray(body)) {
    throw new Error("Unexpected API response format for destinations");
  }

  return body as Destination[];
}

interface DeleteResponse {
  message?: unknown;
  deletedId?: unknown;
}

// Payload expected by PUT /destinations/:id (all editable fields from the edit form)
export interface TravelPackageInput {
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  highlights?: string[];
}

interface UpdateResponse {
  message?: unknown;
  destination?: unknown;
}

/**
 * Update an existing destination (PUT /destinations/:id).
 * Resolves with the updated document on confirmed success, throws otherwise.
 */
export async function updateDestination(
  id: string,
  payload: TravelPackageInput
): Promise<Destination> {
  let response;
  try {
    response = await fetch(`${API_URL}/destinations/${id}`, {
      method: "PUT",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Could not reach the API. Is the backend running?");
  }

  let body: UpdateResponse;
  try {
    body = (await response.json()) as UpdateResponse;
  } catch {
    throw new Error(
      `Unexpected non-JSON response from the API (HTTP ${response.status})`
    );
  }

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(body, `API error (HTTP ${response.status})`)
    );
  }

  if (
    body === null ||
    typeof body !== "object" ||
    body.destination === null ||
    typeof body.destination !== "object"
  ) {
    throw new Error("Unexpected API response format for the updated destination");
  }

  return body.destination as Destination;
}

/**
 * Fetch a single destination by id using the existing GET /destinations/:id endpoint.
 * Returns null when the destination does not exist (HTTP 404 or malformed id),
 * throws an Error for network/other API failures.
 */
export async function getDestination(id: string): Promise<Destination | null> {
  // Guard client-side too — avoids a pointless request for malformed ids
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return null;
  }

  const response = await fetch(`${API_URL}/destinations/${id}`, {
    headers: { Accept: "application/json" },
  });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Error(
      `Unexpected non-JSON response from the API (HTTP ${response.status})`
    );
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(body, `API error (HTTP ${response.status})`)
    );
  }

  if (body === null || typeof body !== "object") {
    throw new Error("Unexpected API response format for the destination");
  }

  return body as Destination;
}

/**
 * Delete a destination by id.
 * Resolves on confirmed server-side deletion, throws with a readable message otherwise.
 */
export async function deleteDestination(id: string): Promise<void> {
  let response;
  try {
    response = await fetch(`${API_URL}/destinations/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
  } catch {
    // Network failure (server down, DNS, CORS preflight rejection...)
    throw new Error("Could not reach the API. Is the backend running?");
  }

  let body: DeleteResponse;
  try {
    body = (await response.json()) as DeleteResponse;
  } catch {
    throw new Error(
      `Unexpected non-JSON response from the API (HTTP ${response.status})`
    );
  }

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(body, `API error (HTTP ${response.status})`)
    );
  }
}
