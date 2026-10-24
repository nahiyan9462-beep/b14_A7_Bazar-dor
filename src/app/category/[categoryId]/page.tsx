import CategoryProducts from "@/components/CategoryProductCard";
import type { IProducts } from "@/types/products";
import { Suspense } from "react";




const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  const data = await res.json();

  // Extract the product array from the API response.
  const products: IProducts[] = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {products[0]?.categoryNameBn ?? "ক্যাটাগরির পণ্য"}
      </h1>
      <Suspense
        fallback={
          <div className="py-16 text-center text-gray-500">
            Loading category products...
          </div>
        }
      >
        <CategoryProducts products={products} />
      </Suspense>
    </main>
  );
};

export default CategoryPage;