"use client";

import { useEffect, useState } from "react";
import LineLink from "@/components/LineLink";

/** Hero 主 CTA 可見、或進入 #contact 區時自動隱藏，避免遮住主 CTA 與版權（這兩處已有更大的 LINE 主鈕） */
export default function FloatingLine({ show = true }: { show?: boolean }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!show) return;
    // Hero 主 CTA 只要露出一點就隱藏（小螢幕首屏浮動鈕會蓋住主按鈕右端，且同功能重複）；
    // #contact 則進入畫面 80px 後才隱藏
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const observers = (
      [
        [document.querySelector(".btn-hero"), "0px"],
        [document.getElementById("contact"), "0px 0px -80px 0px"],
      ] as const
    ).flatMap(([el, rootMargin]) => {
      if (!el) return [];
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(el);
          else visible.delete(el);
          setHidden(visible.size > 0);
        },
        { rootMargin },
      );
      io.observe(el);
      return [io];
    });
    return () => observers.forEach((io) => io.disconnect());
  }, [show]);

  if (!show) return null;
  return (
    <LineLink
      source="floating"
      icon={false}
      className={`btn-line float-line${hidden ? " is-hidden" : ""}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      {/* 不設 aria-label：可及名稱直接取可見文字「LINE 估價」，避免 label-content-name-mismatch */}
      <span>
        LINE
        <br />
        估價
      </span>
    </LineLink>
  );
}
