"use client";

import { useEffect, useRef } from "react";
import type * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { abbr, money, PLACEHOLDER, type Listing } from "./listings";

const OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTR = "&copy; OpenStreetMap contributors";
const SAT_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const SAT_ATTR = "Imagery &copy; Esri";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

function popupHtml(l: Listing) {
  const specs =
    l.type === "Land"
      ? `${esc(l.lot ?? "")} · Lot`
      : `${l.beds} bd · ${l.baths} ba · ${l.sqft?.toLocaleString()} sqft`;
  return `<div class="lm-pop">
    <div class="lm-pop-media"><img src="${l.img}" alt="${esc(l.addr)}" referrerpolicy="no-referrer"
      onerror="this.onerror=null;this.src='${PLACEHOLDER}'"><span class="lm-pop-status">${l.status}</span></div>
    <div class="lm-pop-body">
      <div class="lm-pop-price">${money(l.price)}</div>
      <div class="lm-pop-specs">${specs}</div>
      <div class="lm-pop-addr">${esc(l.addr)}, ${esc(l.city)}</div>
    </div>
  </div>`;
}

export default function MapPanel({
  items,
  mapType,
  onOpen,
}: {
  items: Listing[];
  mapType: "map" | "satellite";
  onOpen: (l: Listing) => void;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const LRef = useRef<typeof L | null>(null);
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  // Init the map once (client only)
  useEffect(() => {
    let cancelled = false;
    let ro: ResizeObserver | undefined;
    (async () => {
      const leaflet = (await import("leaflet")).default;
      if (cancelled || !elRef.current || mapRef.current) return;
      LRef.current = leaflet;
      const map = leaflet.map(elRef.current, {
        zoomControl: false,
        scrollWheelZoom: true,
        attributionControl: true,
      }).setView([34.12, -118.39], 12);
      leaflet.control.zoom({ position: "bottomright" }).addTo(map);
      tileRef.current = leaflet.tileLayer(OSM_URL, { attribution: OSM_ATTR, maxZoom: 19 }).addTo(map);
      layerRef.current = leaflet.layerGroup().addTo(map);
      mapRef.current = map;
      drawMarkers();
      // keep the map sized correctly when the panel shows/resizes
      ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(elRef.current);
    })();
    return () => {
      cancelled = true;
      ro?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swap tile layer when Map/Satellite toggles
  useEffect(() => {
    const leaflet = LRef.current;
    const map = mapRef.current;
    if (!leaflet || !map) return;
    if (tileRef.current) map.removeLayer(tileRef.current);
    tileRef.current = leaflet
      .tileLayer(mapType === "satellite" ? SAT_URL : OSM_URL, {
        attribution: mapType === "satellite" ? SAT_ATTR : OSM_ATTR,
        maxZoom: 19,
      })
      .addTo(map);
    tileRef.current.bringToBack();
  }, [mapType]);

  // Redraw markers when the result set changes
  function drawMarkers() {
    const leaflet = LRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!leaflet || !map || !layer) return;
    layer.clearLayers();
    const bounds: [number, number][] = [];
    items.forEach((l) => {
      const icon = leaflet.divIcon({
        className: "lm-pin-wrap",
        html: `<span class="lm-pin${l.status === "Coming Soon" ? " is-coming" : ""}">${abbr(l.price)}</span>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      const m = leaflet.marker([l.lat, l.lng], { icon, riseOnHover: true });
      m.bindPopup(popupHtml(l), { closeButton: true, minWidth: 236, maxWidth: 236, offset: [0, -6] });
      m.on("popupopen", (e) => {
        const node = (e.popup.getElement() as HTMLElement)?.querySelector(".lm-pop");
        node?.addEventListener("click", () => onOpenRef.current(l));
      });
      m.addTo(layer);
      bounds.push([l.lat, l.lng]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
  }

  useEffect(() => {
    drawMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return <div ref={elRef} className="lm-map" />;
}
