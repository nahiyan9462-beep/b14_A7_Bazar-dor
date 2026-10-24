
import CategoryProducts from "@/components/CategoryProductCard";
import type { IProducts } from "@/types/products";

export default async function CategoryContent({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
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

  const products: IProducts[] = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {products[0]?.categoryNameBn ?? "ক্যাটাগরির পণ্য"}
      </h1>

      {products.length > 0 ? (
        <CategoryProducts products={products} />
      ) : (
        <p className="py-10 text-center text-gray-500">
          No products found in this category.
        </p>
      )}
    </section>
  );
}
