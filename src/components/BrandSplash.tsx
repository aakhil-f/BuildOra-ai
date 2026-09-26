import { useEffect, useState } from "react";
import splashArtwork from "@/assets/buildora-ai-splash.png";

const SPLASH_DURATION = 3650;
const REDUCED_SPLASH_DURATION = 900;

export function BrandSplash({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? REDUCED_SPLASH_DURATION : SPLASH_DURATION;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setLeaving(true), duration - 650);
    const completeTimer = window.setTimeout(onComplete, duration);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <div
      className={`brand-splash ${leaving ? "brand-splash-leaving" : ""}`}
      aria-label="Buildora AI"
      role="img"
    >
      <div className="brand-splash-atmosphere" aria-hidden />
      <div className="brand-splash-stage">
        <img
          src={splashArtwork}
          alt="BuildAura AI — Build, Automate, Grow"
          className="brand-splash-reflection"
        />
        <div className="brand-splash-reveal">
          <img
            src={splashArtwork}
            alt=""
            className="brand-splash-artwork"
          />
          <span className="brand-splash-sweep" aria-hidden />
        </div>
      </div>
    </div>
  );
}