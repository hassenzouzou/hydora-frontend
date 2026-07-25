import { Link } from "@tanstack/react-router";
import { Droplet } from "lucide-react";

type Props = { className?: string; onDark?: boolean };

/**
 * HYDORA wordmark — SVG-based fallback logo.
 * Replace with <img src="/logo.png" /> once the user uploads the official file.
 */
export function Logo({ className = "h-9", onDark = false }: Props) {
  const textColor = onDark ? "#ffffff" : "#152558";
  const dropColor = "#00c4e2";
  return (
    <Link to="/" className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="inline-flex items-baseline gap-[2px] font-extrabold tracking-tight" style={{ color: textColor, fontSize: "1.5rem" }}>
        HYD
        <span className="relative inline-flex items-center justify-center" style={{ width: "1.1em", height: "1.1em" }}>
          <Droplet className="absolute inset-0 h-full w-full" style={{ color: dropColor, fill: dropColor }} strokeWidth={2} />
        </span>
        RA
      </span>
      <span
        className="mt-[2px] text-[9px] font-semibold uppercase"
        style={{ color: dropColor, letterSpacing: "0.25em" }}
      >
        Stay Refreshed
      </span>
    </Link>
  );
}
