
import { Suspense } from "react";
import ProductDetailContent from "./ProductContent";

interface PageProps {
  params: Promise<{ productId: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <main className="p-8">
      <Suspense
        fallback={
          <div className="py-16 text-center text-gray-500">
            Loading product details...
          </div>
        }
      >
        <ProductDetailContent params={params} />
      </Suspense>
    </main>
  );
}
