import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

interface WilayaOption {
  id: string | number;
  name: string;
}

interface WilayaSelectProps {
  options: WilayaOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function WilayaSelect({ options, value, onChange, disabled }: WilayaSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter((opt) =>
    opt.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-surface px-4 py-3 rounded-xl border focus:border-cyan-brand text-sm flex items-center justify-between text-start disabled:opacity-60"
      >
        <span className="truncate text-navy">{value || "اختر الولاية"}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-xl border border-border-subtle shadow-lg overflow-hidden">
          <div className="p-2 border-b border-border-subtle flex items-center gap-2 bg-surface">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث بالرقم أو الاسم..."
              className="w-full bg-transparent outline-none text-sm text-navy"
              autoFocus
            />
          </div>

          <ul className="max-h-60 overflow-y-auto py-1 pb-2">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-muted-foreground text-center">
                لا توجد ولاية مطابقة
              </li>
            ) : (
              filtered.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.name);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`w-full text-start px-4 py-2.5 text-sm transition-colors ${
                      opt.name === value
                        ? "bg-cyan-brand text-white font-semibold"
                        : "text-navy hover:bg-surface-alt"
                    }`}
                  >
                    {opt.name}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
