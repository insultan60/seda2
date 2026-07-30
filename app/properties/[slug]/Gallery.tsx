"use client";

import { useEffect, useState } from "react";

export default function Gallery({ images, addr }: { images: string[]; addr: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("center");

  const open = (i: number) => { setLightbox(i); setZoom(false); };
  const close = () => { setLightbox(null); setZoom(false); };
  const step = (dir: number) =>
    setLightbox((i) => (i === null ? i : (i + dir + images.length) % images.length));

  const onMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!zoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") { setZoom(false); step(1); }
      else if (e.key === "ArrowLeft") { setZoom(false); step(-1); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  const more = images.length - 5;

  return (
    <>
      {/* eslint-disable @next/next/no-img-element */}
      <div className="pd-gallery__grid">
        {images.slice(0, 5).map((src, i) => (
          <button type="button" className="pd-cell" key={i} onClick={() => open(i)} aria-label={`View photo ${i + 1} of ${images.length}`}>
            <img src={src} alt={`${addr} photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} data-fallback />
            {i === 4 && more > 0 && <span className="pd-more">{more} More Photos</span>}
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div className="pd-lightbox" role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={close}>
          <button className="pd-lb-close" onClick={close} aria-label="Close gallery">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          <span className="pd-lb-counter">{lightbox + 1} / {images.length}</span>
          <button className="pd-lb-nav pd-lb-prev" onClick={(e) => { e.stopPropagation(); setZoom(false); step(-1); }} aria-label="Previous photo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="pd-lb-stage" onClick={(e) => e.stopPropagation()}>
            <img
              className={`pd-lb-img${zoom ? " is-zoomed" : ""}`}
              src={images[lightbox]}
              alt={`${addr} photo ${lightbox + 1}`}
              style={zoom ? { transformOrigin: origin } : undefined}
              onClick={() => setZoom((z) => !z)}
              onMouseMove={onMove}
            />
          </div>
          <button className="pd-lb-nav pd-lb-next" onClick={(e) => { e.stopPropagation(); setZoom(false); step(1); }} aria-label="Next photo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <div className="pd-lb-thumbs" onClick={(e) => e.stopPropagation()}>
            {images.map((src, i) => (
              <button key={i} className={`pd-lb-thumb${i === lightbox ? " is-active" : ""}`} onClick={() => { setLightbox(i); setZoom(false); }} aria-label={`Go to photo ${i + 1}`}>
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
