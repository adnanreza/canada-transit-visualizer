# Canada Transit Visualizer

Fast, interactive maps of Canada — built on open data, with public transit as
the first lens. A portfolio project by [Adnan Reza](https://github.com/adnanreza).

## Why

Government map portals like [atlas.gc.ca](https://atlas.gc.ca/) sit on top of
incredible open data, but the experience is heavy and clunky. This project is
an exercise in shipping the same kind of visualizations with a modern,
performance-first stack — and adding the editorial framing that helps people
actually understand what they're looking at.

## Stack

- **Vite 7 + React 19 + TypeScript**
- **MapLibre GL JS** (via `react-map-gl`) for the basemap
- **deck.gl** for data-heavy layers (hexbins, choropleths, arcs, isochrones)
- **Tailwind CSS v4** for styling
- **React Router v6** for client routing
- **vite-react-ssg** to pre-render every route at build time → real HTML for
  SEO and social previews, hydrates into a live SPA after first paint
- **Cloudflare Pages** for hosting (static + CDN, free tier)

Map tiles come from [OpenFreeMap](https://openfreemap.org/) (free, no API
key). Boundaries are sourced from Statistics Canada cartographic files under
the Open Government Licence — Canada.

## Local development

```bash
npm install
npm run dev        # vite dev server on http://localhost:5173
npm run build      # vite-react-ssg build → dist/
npm run preview    # serve the production build locally
npm run typecheck
npm run lint
```

## Deployment

The build output (`dist/`) is a fully static site. Cloudflare Pages config
lives in `wrangler.toml`; the `_redirects` and `_headers` files in `public/`
handle SPA fallback and cache headers.

## Roadmap

- [x] Site shell, SSG, MapLibre basemap
- [ ] **Transit accessibility (Toronto)** — click any point, see how far you
      can travel by transit in 15/30/45 min. Precomputed travel-time matrix
      on an H3 grid; rendered with deck.gl.
- [ ] Extend accessibility to Montréal, Vancouver, Calgary, Ottawa.
- [ ] Population vs frequent-transit coverage choropleth.
- [ ] More Canada-themed visualizations — open to ideas.

## License

MIT — see [`LICENSE`](./LICENSE).
