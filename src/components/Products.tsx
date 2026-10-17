
import ProductCard from "./ProductCard";
import { IProducts } from "@/types/products";

const ProductsPage = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  const products: IProducts[] = Array.isArray(result)
    ? result
    : Array.isArray(result.data)
      ? result.data
      : Array.isArray(result.products)
        ? result.products
        : [];

  // Calculate each product's price change.
  const withChange = products.map((product) => ({
    ...product,
    change:
      typeof product.today === "number" &&
      typeof product.yesterday === "number" &&
      product.yesterday !== 0
        ? ((product.today - product.yesterday) /
            product.yesterday) *
          100
        : 0,
  }));

  // Products whose prices increased.
  const increased = withChange
    .filter((product) => product.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  // Products whose prices did not increase.
  const notIncreased = withChange
    .filter((product) => product.change <= 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      {/* Prices increased */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-slate-900 sm:text-2xl">
          <span className="mr-2 text-rose-600">▲</span>
          আজ দাম বেড়েছে
        </h2>

        {increased.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {increased.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-5 text-slate-500">
            আজ কোনো পণ্যের দাম বাড়েনি।
          </p>
        )}
      </section>

      
      <section>
        <h2 className="mb-5 text-xl font-bold text-slate-900 sm:text-2xl">
          <span className="mr-2 text-emerald-600">▼</span>
          আজ কোনো দাম বাড়েনি
        </h2>

        {notIncreased.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notIncreased.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-5 text-slate-500">
            দাম না-বাড়া কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
      <section>
         <h2 className="mb-5 text-xl font-bold text-slate-900 sm:text-2xl">
          সব পণ্য
        </h2>
        <p className="text-slate-500">
          
        </p>
        {notIncreased.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-5 text-slate-500">
            দাম না-বাড়া কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </main>
  );
};

export default ProductsPage;
