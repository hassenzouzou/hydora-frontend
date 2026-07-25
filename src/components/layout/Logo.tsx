import { Link } from "@tanstack/react-router";
import { Droplet } from "lucide-react";
import { Image } from "lucide-react";

type Props = { className?: string; onDark?: boolean };

/**
 * HYDORA wordmark — SVG-based fallback logo.
 * Replace with <img src="/logo.png" /> once the user uploads the official file.
 */
export function Logo({ className = "h-9", onDark = false }: Props) {
  const textColor = onDark ? "#ffffff" : "#152558";
  const dropColor = "#00c4e2";
  return (
    <Link to="/" className={`inline-flex items-center leading-none ${className}`}>
      <img src="../../../public/logo.PNG" width={100} alt="Picture of the author" />
    </Link>
  );
}
