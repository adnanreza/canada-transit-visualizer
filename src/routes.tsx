import type { RouteRecord } from "vite-react-ssg";
import App from "./App";
import Home from "./pages/Home";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "accessibility", Component: Accessibility },
      { path: "*", Component: NotFound },
    ],
  },
];
