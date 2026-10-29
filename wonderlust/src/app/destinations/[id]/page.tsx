import { Suspense } from "react";
import DestinationDetails from "./DestinationDetails";

// Loading skeleton shown while the route params resolve / data loads
function DestinationDetailsSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="h-6 w-44 animate-pulse bg-gray-200" />

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
  );
}

export default async function DestinationDetailsPage({
  params,
}: PageProps<"/destinations/[id]">) {
  return (
    <main className="min-h-screen pt-20 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <Suspense fallback={<DestinationDetailsSkeleton />}>
          <DestinationDetailsAsync params={params} />
        </Suspense>
      </div>
    </main>
  );
}

// The awaited params are uncached data under cacheComponents,
// so they must resolve inside the <Suspense> boundary above.
async function DestinationDetailsAsync({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DestinationDetails id={id} />;
}
