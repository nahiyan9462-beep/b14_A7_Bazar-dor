"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { IProducts } from "@/types/products";
import Link from "next/link";


type Product = React.ComponentProps<typeof ProductCard>["product"];

interface CategoryProductsProps {
  products: IProducts[];
}

type SortOption = "default" | "price-low" | "price-high" | "name";

function getPrice(product: IProducts): number {
  const item = product

  const value =
    item.today ??
    item.lastWeek ??
    item.lastMonth ??
    item.yesterday ??
    item.today ??
    item.today;

  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const normalized = value
      .replace(/[০-৯]/g, (digit) =>
        String("০১২৩৪৫৬৭৮৯".indexOf(digit))
      )
      .replace(/,/g, "");

    return Number(normalized.replace(/[^\d.-]/g, "")) || 0;
  }

  return 0;
}

function getName(product: Product): string {
  const item = product;

  return String(item.nameBn ?? item.id ?? item.image ?? "");
}

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    switch (sortBy) {
      case "price-low":
        return result.sort((a, b) => getPrice(a) - getPrice(b));

      case "price-high":
        return result.sort((a, b) => getPrice(b) - getPrice(a));

      case "name":
        return result.sort((a, b) =>
          getName(a).localeCompare(getName(b), "bn")
        );

      default:
        return result;
    }
  }, [products, sortBy]);

  return (
    <section className="space-y-6">
      {/* Results and sorting */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="product-sort"
            className="whitespace-nowrap text-sm font-medium text-gray-600"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
          </select>
        </div>
      </div>
  
      {/* Product grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={
                product.id as
                  | string
                  | number
              }
              product={product}
            />
          ))}
        </div>
      
      ) : (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </section>
  );
}



          // <Link
          //   href="/"
          //   className="btn btn-primary mt-4"
          // >
          //   হোম পেজে ফিরে যান
          // </Link>