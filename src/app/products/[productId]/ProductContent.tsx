
import ProductDetails from "@/components/ProductDetails";
import type { IProducts } from "@/types/products";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetailContent({
  params,
}: PageProps) {
  const { productId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${encodeURIComponent(productId)}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const product: IProducts | undefined = data.data ?? data;

  if (!product?.id || !Array.isArray(product.markets)) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
