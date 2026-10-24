
import { Suspense } from "react";
import CategoryContent from "./CategoryContent";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div className="py-16 text-center text-gray-500">
            Loading category products...
          </div>
        }
      >
        <CategoryContent params={params} />
      </Suspense>
    </main>
  );
}
