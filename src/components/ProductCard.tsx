

import type { IProducts } from "@/types/products";

import Link from "next/link";

interface ProductCardProps {
  product: IProducts;
}

const takaFormatter = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

export default function ProductCard({ product }: ProductCardProps) {
  const {
    today,
    yesterday,
    change,
  } = product;

  const isUp = today > yesterday;
  const isDown = today < yesterday;

  const percentage =
    yesterday !== 0
      ? Math.abs(((today - yesterday) / yesterday) * 100)
      : Math.abs(change?.pct ?? 0);

  const trendColor = isUp
    ? "text-rose-600"
    : isDown
      ? "text-emerald-600"
      : "text-slate-500";

  const trendBg = isUp
    ? "bg-rose-50"
    : isDown
      ? "bg-emerald-50"
      : "bg-slate-100";

  return (
    <Link
      href={`/products/${product.id}`}
      className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
      aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
    >
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      {/* Product information */}
      <div className="flex items-center gap-3">
        {/* <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.nameBn}
              width={48}
              height={48}
              className="size-full object-contain p-1.5"
            />
        </div> */}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-slate-800">
            {product.nameBn}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      {/* Price and change */}
      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-slate-500">
            আজকের দাম
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900">
            {takaFormatter.format(product.today)}{" "}
            <span className="text-sm font-medium text-slate-600">
              টাকা
            </span>
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${trendColor} ${trendBg}`}
          aria-label={
             isUp
              ? "দাম বেড়েছে"
              :isDown
                ? "দাম কমেছে"
                : "দাম অপরিবর্তিত"
          }
        >
          <span aria-hidden="true">
            {isUp ? "▲" : isDown ? "▼" : "—"}
          </span>

          {isUp || isDown
            ? `${percentFormatter.format(percentage)}%`
            : "০%"}
        </span>
      </div>
    </article>
    </Link> 
  );
}
