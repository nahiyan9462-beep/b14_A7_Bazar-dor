
"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface ProfileDropdownProps {
  name: string;
  email: string;
  image?: string;
  onProfile?: () => void;
  onLogout: () => void;
}

export default function ProfileDropdown({
  name,
  email,
  image,
  onProfile,
  onLogout,
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex items-center gap-3 rounded-xl px-3 py-2
                   transition hover:bg-gray-100"
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center
                          rounded-full bg-green-100 text-green-700">
            <Icon icon="mdi:account" width={27} />
          </div>
        )}

        <span className="text-lg font-semibold text-gray-900">
          {name.split(" ")[0]}
        </span>

        <Icon
          icon="mdi:chevron-down"
          width={21}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Click outside to close */}
          <button
            type="button"
            aria-label="Close profile menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div
            className="absolute right-0 top-full z-50 mt-3
                       w-80 max-w-[calc(100vw-2rem)]
                       overflow-hidden rounded-2xl border
                       border-gray-100 bg-white shadow-xl"
          >
            {/* User information */}
            <div className="border-b border-gray-100 px-6 py-5">
              <div className="flex items-center gap-3">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center
                                  justify-center rounded-full
                                  bg-green-100 text-green-700">
                    <Icon icon="mdi:account" width={32} />
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold text-gray-900">
                    {name}
                  </h3>
                  <p className="truncate text-sm text-gray-500">
                    {email}
                  </p>
                </div>
              </div>
            </div>

            {/* Dropdown actions */}
            <div className="space-y-1 p-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onProfile?.();
                }}
                className="flex w-full items-center gap-3 rounded-xl
                           px-4 py-3 text-left text-gray-800
                           transition hover:bg-green-50"
              >
                <Icon
                  icon="mdi:account-circle-outline"
                  width={23}
                  className="text-green-700"
                />
                <span className="font-medium">আমার প্রোফাইল</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 rounded-xl
                           px-4 py-3 text-left text-red-600
                           transition hover:bg-red-50"
              >
                <Icon icon="mdi:logout" width={23} />
                <span className="font-medium">লগ আউট</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}