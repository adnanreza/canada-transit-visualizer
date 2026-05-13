import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Not found"
        description="The page you were looking for doesn't exist."
      />
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Lost in transit.
        </h1>
        <p className="mt-3 text-slate-600">
          That route doesn't exist on this map.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Back to home
        </Link>
      </section>
    </>
  );
}
