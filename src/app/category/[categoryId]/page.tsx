
import ProductCard from "@/components/ProductCard";
import React from "react";

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/categories/${categoryId}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category data");
  }

  const data = await res.json();

  // Check the API response structure
  const categoryProduct = data.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">
        {data.nameBn ?? data.data?.nameBn ?? "Category Products"}
      </h2>

      {Array.isArray(categoryProduct) && categoryProduct.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProduct.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="min-h-screen flex items-center justify-center">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
