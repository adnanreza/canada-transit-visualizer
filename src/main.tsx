import "./index.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";

export const createRoot = ViteReactSSG({ routes });
