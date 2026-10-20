
import type { IProducts } from "@/types/products";

interface ProductDetailsProps {
  product: IProducts;
}

const taka = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

function formatPrice(price: number) {
  return `${taka.format(price)} টাকা`;
}

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const { markets } = product;

  const lowestPrice = Math.min(...markets.map((m) => m.min));
  const highestPrice = Math.max(...markets.map((m) => m.max));

  // Average of all market price ranges.
  const averagePrice =
    markets.reduce((total, market) => {
      return total + (market.min + market.max) / 2;
    }, 0) / markets.length;

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-700"
        : "text-gray-500";

  return (
    <main className="min-h-screen bg-[#f5f7f2] px-4 py-6 text-[#17251e] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>হোম</span>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <span className="font-medium text-gray-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product header */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#edf5e9] text-4xl sm:h-20 sm:w-20">
              {product.image || product.categoryIcon}
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>

              <p className="mt-3 text-sm text-gray-600">
                গতকালের তুলনায় আজ দাম{" "}
                {product.change.dir === "up"
                  ? "বেড়েছে"
                  : product.change.dir === "down"
                    ? "কমেছে"
                    : "অপরিবর্তিত"}{" "}
                · {formatPrice(Math.abs(product.today - product.yesterday))}
              </p>
            </div>
          </div>

          <div className="sm:min-w-40 sm:text-right">
            <p className="text-sm text-gray-500">আজকের গড় দাম</p>

            <p className="mt-1 text-4xl font-extrabold tracking-tight">
              {taka.format(product.today)}
            </p>

            <p className="text-sm text-gray-500">
              টাকা / {product.unit}
            </p>

            <p className={`mt-2 text-sm font-semibold ${changeColor}`}>
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "●"}{" "}
              {taka.format(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Price summary */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="mb-6 text-xl font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryCard
              title="সর্বনিম্ন দাম"
              price={lowestPrice}
              description="সবচেয়ে কম দামের বাজার"
              color="text-green-700"
            />

            <SummaryCard
              title="সর্বোচ্চ দাম"
              price={highestPrice}
              description="সবচেয়ে বেশি দামের বাজার"
              color="text-red-600"
            />

            <SummaryCard
              title="গড় দাম"
              price={averagePrice}
              description="সব বাজারের গড় মূল্য"
              color="text-green-700"
            />
          </div>
        </section>

        {/* Market price table */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-800">
              {taka.format(markets.length)}টি বাজার
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="px-3 py-4 font-medium">বাজার</th>
                  <th className="px-3 py-4 font-medium">বিভাগ</th>
                  <th className="px-3 py-4 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-3 py-4 text-right font-medium">
                    সর্বোচ্চ
                  </th>
                  <th className="px-3 py-4 text-right font-medium">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const marketAverage =
                    (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-b border-gray-100 transition-colors hover:bg-[#f7faf5]"
                    >
                      <td className="px-3 py-4 font-medium text-gray-800">
                        {market.market}
                      </td>

                      <td className="px-3 py-4 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-3 py-4 text-right font-medium">
                        {formatPrice(market.min)}
                      </td>

                      <td className="px-3 py-4 text-right font-medium">
                        {formatPrice(market.max)}
                      </td>

                      <td className="px-3 py-4 text-right font-semibold text-green-800">
                        {formatPrice(marketAverage)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            দ্রষ্টব্য: বাজারের গড় মূল্য সর্বনিম্ন ও সর্বোচ্চ দামের
            মধ্যবিন্দু থেকে হিসাব করা হয়েছে।
          </p>
        </section>
      </div>
    </main>
  );
}

interface SummaryCardProps {
  title: string;
  price: number;
  description: string;
  color: string;
}

function SummaryCard({
  title,
  price,
  description,
  color,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-[#fafbf8] p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <p className={`mt-2 text-2xl font-bold ${color}`}>
        {formatPrice(price)}
      </p>

      <p className="mt-2 text-xs text-gray-500">
        {description}
      </p>
    </div>
  );
}
