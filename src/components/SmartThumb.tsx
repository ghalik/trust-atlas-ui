import React from "react";
import { resolveThumb } from "@/lib/resolveThumb";

export default function SmartThumb({
  url,
  alt,
  size = 64,
  className = ""
}: {
  url?: string;
  alt?: string;
  size?: number;
  className?: string;
}) {
  const [src, setSrc] = React.useState<string | null>(null);
  const [state, setState] = React.useState<"idle"|"loading"|"ok"|"empty">("idle");

  React.useEffect(() => {
    let alive = true;
    async function run() {
      if (!url) { setState("empty"); setSrc(null); return; }
      setState("loading");
      const got = await resolveThumb(url);
      if (!alive) return;
      if (got) { setSrc(got); setState("ok"); } else { setSrc(null); setState("empty"); }
    }
    run();
    return () => { alive = false; };
  }, [url]);

  const px = `${size}px`;
  return (
    <div
      style={{ width: px, height: px }}
      className={`shrink-0 rounded-lg border overflow-hidden bg-white flex items-center justify-center ${className}`}
    >
      {state === "ok" && src ? (
        <img
          src={src}
          alt={alt || "thumbnail"}
          width={size}
          height={size}
          className="object-cover w-full h-full"
          onError={() => { setState("empty"); setSrc(null); }}
        />
      ) : state === "loading" ? (
        <div className="text-[10px] text-gray-400">loading…</div>
      ) : (
        <div className="text-[10px] text-gray-400 text-center px-1">nothing to show</div>
      )}
    </div>
  );
}
