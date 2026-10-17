"use client";

import { useEffect, useState } from "react";
import LineLink from "@/components/LineLink";
import { CTA_MAIN } from "@/lib/site";

/** 進入 #contact 區時自動隱藏，避免遮住主 CTA 與版權（該區已有更大的 LINE 主鈕） */
export default function FloatingLine({ show = true }: { show?: boolean }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!show) return;
    const target = document.getElementById("contact");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      rootMargin: "0px 0px -80px 0px",
    });
    io.observe(target);
    return () => io.disconnect();
  }, [show]);

  if (!show) return null;
  return (
    <LineLink
      source="floating"
      className={`btn-line float-line${hidden ? " is-hidden" : ""}`}
      aria-label={CTA_MAIN}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <span aria-hidden="true">
        LINE
        <br />
        估價
      </span>
    </LineLink>
  );
}
