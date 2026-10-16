import Image from "next/image";
import Link from "next/link";
import logo from '@/assets/bazar-hero.png'
export default function Banner() {
  return (
    <section className="overflow-hidden bg-gradient-to-br  mt-5 from-emerald-50 via-white to-green-50">
      <div className="container mx-auto grid shadow-lg rounded rounded-t-5xl rounded-b-5xl grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-12">

        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold tracking-wide text-emerald-700">
            শনিবার, ১৭ অক্টোবর, ২০২৬
          </p>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
            আজকের বাজারের দাম{" "}
            <span className="text-emerald-600">
              এক নজরে
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও ফলের দাম —
            বাজারভিত্তিক বিস্তারিত তথ্য, গড়, সর্বনিম্ন-সর্বোচ্চ
            মূল্য এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              সব পণ্য দেখুন
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>

            <span className="text-sm text-slate-500">
              প্রতিদিনের বাজারদর, সহজেই
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative flex aspect-square w-full max-w-sm items-center justify-center rounded-full bg-emerald-100/70 p-8 sm:max-w-md">
            <div className="absolute inset-5 rounded-full border border-emerald-200/70" />

            <div className="relative z-10 w-full transition duration-500 hover:scale-105">
               <Image
                src={logo}
                height={600}
                width={600}
                alt='banner-img'
                    />

            </div>

            <div className="absolute bottom-10 left-0 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-lg sm:left-2">
              <p className="text-xs text-slate-500">
                বাজারের তথ্য
              </p>
              <p className="mt-1 text-sm font-bold text-emerald-700">
                সব এক জায়গায়
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}