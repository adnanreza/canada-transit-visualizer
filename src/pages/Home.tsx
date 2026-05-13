import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import ClientOnly from "../components/ClientOnly";
import CanadaMap from "../components/CanadaMap";

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="Interactive maps and data visualizations exploring public transit, geography, and policy across Canada."
      />
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-6 sm:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-maple]">
          Canada · Open data · Public transit
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Maps of Canada that respect your time.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          A growing collection of fast, interactive visualizations built on
          open data — starting with public transit accessibility, and expanding
          to the questions Canadians actually care about.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/accessibility"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Explore transit accessibility →
          </Link>
          <a
            href="https://github.com/adnanreza/canada-transit-visualizer"
            className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-300 hover:bg-slate-100"
          >
            View source
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <ClientOnly
          fallback={
            <div className="flex h-[70vh] w-full items-center justify-center rounded-2xl bg-slate-100 text-slate-400 ring-1 ring-slate-200">
              Loading map…
            </div>
          }
        >
          <CanadaMap />
        </ClientOnly>
      </section>
    </>
  );
}
