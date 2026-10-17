"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { splitTitle } from "@/lib/splitTitle";
import LineLink from "@/components/LineLink";
import type { Work } from "@/lib/types";

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // 鎖 body 捲動（補償捲軸寬度，避免桌機版面跳動）
  useEffect(() => {
    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, []);

  // 焦點移入 + Esc 關閉 + Tab 焦點圈在彈窗內
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={panelRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={work.img}
          alt={work.cat}
          width={1024}
          height={1024}
          sizes="(max-width: 700px) calc(100vw - 40px), 460px"
          className="modal-img"
          unoptimized={/^https?:\/\//i.test(work.img) && !/\.supabase\.co\//i.test(work.img)}
        />
        <div className="modal-body">
          <div className="modal-top">
            <span className="work-cat">{work.cat}</span>
            <button ref={closeRef} type="button" className="modal-close" aria-label="關閉" onClick={onClose}>
              ×
            </button>
          </div>
          <span id={titleId} className="modal-title serif">
            {splitTitle(work.title)}
          </span>
          <p className="modal-text">{work.body}</p>
          <LineLink source="work-modal" workSlug={work.slug} className="btn-line btn-modal">
            我也想做類似的 → LINE 免費估價
          </LineLink>
          <span className="reassure reassure-modal">傳訊息時可以說：「我想做類似的{work.cat}」</span>
        </div>
      </div>
    </div>
  );
}
