import { Map } from "react-map-gl/maplibre";
import type { MapProps } from "react-map-gl/maplibre";

const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

const CANADA_VIEW = {
  longitude: -96,
  latitude: 60,
  zoom: 3,
  bearing: 0,
  pitch: 0,
};

type Props = {
  initialViewState?: MapProps["initialViewState"];
  className?: string;
  children?: React.ReactNode;
};

export default function CanadaMap({
  initialViewState = CANADA_VIEW,
  className,
  children,
}: Props) {
  return (
    <div className={className ?? "h-[70vh] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200"}>
      <Map
        initialViewState={initialViewState}
        mapStyle={STYLE_URL}
        attributionControl={{ compact: true }}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </Map>
    </div>
  );
}
