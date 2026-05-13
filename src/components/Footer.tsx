export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Built by Adnan Reza ·{" "}
          <a
            className="underline-offset-2 hover:text-slate-900 hover:underline"
            href="https://github.com/adnanreza/canada-transit-visualizer"
          >
            Source on GitHub
          </a>
        </p>
        <p>
          Map tiles: OpenFreeMap · Boundaries: Statistics Canada (Open Licence)
        </p>
      </div>
    </footer>
  );
}
