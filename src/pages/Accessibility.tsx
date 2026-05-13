import Seo from "../components/Seo";

export default function Accessibility() {
  return (
    <>
      <Seo
        title="Transit accessibility"
        description="Click anywhere in Canada to see how far you can travel by public transit in 15, 30, or 45 minutes."
        path="/accessibility"
      />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-maple]">
          Coming soon
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Transit accessibility, anywhere in Canada.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          The plan: click any point in a Canadian city, and see how far you can
          actually go on transit in 15, 30, or 45 minutes — using real GTFS
          schedules and OpenStreetMap walking networks.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-600">
          <li>Phase 1: Toronto (TTC + GO) — proof of concept.</li>
          <li>Phase 2: Montréal, Vancouver, Calgary, Ottawa.</li>
          <li>
            Phase 3: every Canadian transit agency with a public GTFS feed.
          </li>
        </ul>
      </section>
    </>
  );
}
