import { Link } from "@tanstack/react-router";

type Props = { className?: string; onDark?: boolean };

export function Logo({ className = "h-9", onDark = false }: Props) {
  return (
    <Link to="/" className={`inline-flex items-center leading-none ${className}`}>
      {onDark ? (
        <div className="bg-white rounded-xl p-2 h-full flex items-center">
          <img
            src="/logo.webp"
            width={200}
            height={60}
            alt="HYDORA"
            className="w-auto h-full object-contain"
            fetchPriority="high"
          />
        </div>
      ) : (
        <img
          src="/logo.webp"
          width={200}
          height={60}
          alt="HYDORA"
          className="w-auto h-full object-contain"
          fetchPriority="high"
        />
      )}
    </Link>
  );
}
