"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import WorkModal from "@/components/WorkModal";
import type { Work } from "@/lib/types";

export default function Works({ works }: { works: Work[] }) {
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setActiveWorkIndex(null);
    // 焦點歸還給開啟彈窗的卡片
    const opener = openerRef.current;
    if (opener) requestAnimationFrame(() => opener.focus({ preventScroll: true }));
  }, []);

  const active = activeWorkIndex == null ? null : works[activeWorkIndex] ?? null;

  return (
    <section id="works" className="sec safe-x">
      <div className="works-head">
        <div className="sec-title">
          <span className="eyebrow">作品集</span>
          <h2 className="h2 h2-works serif">
            一個模具，
            <br />
            讓你與市場徹底區隔
          </h2>
        </div>
        <p className="works-desc">品牌標誌、圖騰紋樣、角色或主題造型，都能細緻還原。點擊作品看完整介紹。</p>
      </div>
      <div className="works-grid">
        {works.map((w, i) => (
          <button
            key={w.slug}
            type="button"
            className="work-card"
            aria-haspopup="dialog"
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setActiveWorkIndex(i);
            }}
          >
            <div className="work-thumb">
              <Image
                src={w.img}
                alt={w.cat}
                width={600}
                height={600}
                sizes="(max-width: 374px) calc(100vw - 40px), (max-width: 1200px) 50vw, 276px"
                className="work-img"
                unoptimized={/^https?:\/\//i.test(w.img) && !/\.supabase\.co\//i.test(w.img)}
              />
            </div>
            <div className="work-meta">
              <span className="work-cat">{w.cat}</span>
              <span className="work-title serif">{w.title}</span>
            </div>
          </button>
        ))}
      </div>
      {active && <WorkModal work={active} onClose={close} />}
    </section>
  );
}
