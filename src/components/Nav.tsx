import { NavLink, Link } from "react-router-dom";

const linkBase =
  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors";
const linkInactive = "text-slate-600 hover:bg-slate-200 hover:text-slate-900";
const linkActive = "bg-slate-900 text-white";

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-5 w-5 rounded-sm bg-[--color-maple]"
          />
          <span className="text-base font-semibold tracking-tight">
            Canada Transit Visualizer
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/accessibility"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Accessibility
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
