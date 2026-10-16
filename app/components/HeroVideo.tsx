"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The home page hero film.
 *
 * It does not use the autoplay attribute. With autoplay the browser starts the
 * film as soon as it has a few frames, then keeps downloading while it plays,
 * and on an ordinary home connection the first pass stalled and stuttered
 * through the camera pans. The second and third loops were smooth only
 * because by then the whole file was in the cache. Most visitors never see a
 * second loop, so the first one has to be the smooth one.
 *
 * Instead the poster (the film's own opening frame) stays up while the file
 * loads with preload="auto", and play() is called once the browser reports it
 * can play through without stopping (canplaythrough). A fallback starts it
 * anyway after a few seconds, so a slow connection still gets the film rather
 * than a still frame forever. Muted inline playback started from script is
 * allowed everywhere autoplay is.
 *
 * The file names carry a version (-v3). The first fix kept the old names, and
 * browsers that had cached ranges of the old film went on playing pieces of
 * it on the first pass. A new name cannot be served from an old cache. Bump
 * the version whenever the film itself changes.
 *
 * The still shown while it loads is a <picture> under the video, not the
 * video's poster attribute. The film used to open with two stray frames of
 * the drive before the terrace shot, so the hand-over flashed one scene and
 * jumped to another. v3 trims those frames, and the stills are now the first
 * frame of each cut, and
 * a <picture> can pick the portrait one on phones, which a poster cannot. The
 * video stays transparent until its first frame is actually painted, then
 * fades in over the still, so the hand-over is invisible even if decoding
 * lags. Re-export both stills whenever the film changes.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Reveal on the first painted frame, not on "playing", which can fire
    // before anything is on screen.
    const reveal = () => {
      const v = video as HTMLVideoElement & {
        requestVideoFrameCallback?: (cb: () => void) => number;
      };
      if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(() => setShown(true));
      else setShown(true);
    };
    video.addEventListener("playing", reveal, { once: true });

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      video.muted = true;
      video.play().catch(() => {
        /* Refused (Low Power Mode, data saver): the poster stays up, which is
           the same thing the autoplay attribute would have left behind. */
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) start();
    video.addEventListener("canplaythrough", start, { once: true });
    const fallback = window.setTimeout(start, 6000);

    return () => {
      video.removeEventListener("canplaythrough", start);
      video.removeEventListener("playing", reveal);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      {/* The film's own first frame, landscape and portrait cuts. Also what
          stays up wherever playback is refused (iOS Low Power Mode, data
          saver). */}
      <picture>
        <source srcSet="/assets/intro-video-poster-mobile-v3.webp" media="(orientation: portrait)" />
        <img className="hero__img" src="/assets/intro-video-poster-v3.webp" alt="" fetchPriority="high" />
      </picture>
      <video
        ref={ref}
        className={`hero__img hero__video${shown ? " is-shown" : ""}`}
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Introduction video — Alexandra Kerr, Los Angeles real estate"
      >
        {/* Portrait screens get a portrait cut (406x720). It is not a fixed
            centre crop: the window moves shot by shot to keep Alexandra in
            frame, because a centre crop cut her head off in the cafe shot,
            where she stands left of centre. Selected by orientation rather than
            width so a portrait iPad gets it too. The browser takes the first
            <source> whose media query matches, so this one has to come first. */}
        <source src="/assets/intro-video-mobile-v3.mp4" type="video/mp4" media="(orientation: portrait)" />
        <source src="/assets/intro-video-v3.mp4" type="video/mp4" />
      </video>
    </>
  );
}
