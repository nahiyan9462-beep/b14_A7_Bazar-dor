 
 "use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f9f6] px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-700">
          <Icon icon="lucide:map-pin-off" width={38} height={38} />
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-700">
          Error 404
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-gray-500">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          It may have been moved or no longer exists.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#079447] px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#067b3b] focus:outline-none focus:ring-4 focus:ring-green-100"
        >
          <Icon icon="lucide:house" width={19} height={19} />
          Back to Home
        </Link>

        <p className="mt-8 text-sm text-gray-400">
          If you believe this is a mistake, please try again.
        </p>
      </div>
    </main>
  );
}