import { Link } from "@tanstack/react-router";

type Props = { className?: string; onDark?: boolean };

export function Logo({ className = "h-9", onDark = false }: Props) {
  return (
    <Link to="/" className={`inline-flex items-center leading-none ${className}`}>
      {onDark ? (
        <div className="bg-white rounded-xl p-2">
          <img src="../../../logo.PNG" width={100} alt="HYDORA" />
        </div>
      ) : (
        <img src="../../../logo.PNG" width={100} alt="HYDORA" />
      )}
    </Link>
  );
}
