import ProductDetails from "@/components/ProductDetails";
import { IProducts } from "@/types/products";
import { notFound } from "next/navigation";



interface PageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetailPage({
  params,
}: PageProps) {
    const { productId } = await params;
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
        {
      next: { revalidate: 3600 },
    }
    );
    const data = await res.json();
     const product: IProducts = data.data ?? data;

  if (!product || !product.id || !Array.isArray(product.markets)) {
    notFound();
  }
  return (
    <main className="p-8">
       <ProductDetails product={product} />;
    </main>
  );
}
