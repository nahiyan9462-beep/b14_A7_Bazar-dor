

import Link from "next/link";

type ICategory = {
  id: string | number;
  slug: string;
  nameBn: string;
  icon?: string;
};

type ApiResponse = {
  data: ICategory[];
};

export default async function NavLinks() {
  let categories: ICategory[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const result: ApiResponse = await res.json();
    categories = result.data;
  } catch (error) {
    console.error("Category fetch error:", error);

    return (
      <div className="px-4 py-3 text-sm text-red-600">
        ক্যাটাগরি লোড করা যায়নি।
      </div>
    );
  }

  return (
    <nav
      aria-label="Product categories"
      className="w-full border-b border-gray-200 bg-white"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 sm:gap-4 sm:px-6 lg:justify-center lg:px-8">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-4 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
              index === 0
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-600 hover:border-green-500 hover:text-green-700"
            }`}
          >
            <span aria-hidden="true" className="text-lg">
              {category.icon}
            </span>

            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}