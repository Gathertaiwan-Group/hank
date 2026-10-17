import LineLink from "@/components/LineLink";
import { CTA_MAIN } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="band" aria-label="傳圖估價">
      <div className="band-inner safe-x">
        <div className="band-text">
          <span className="band-title serif">只有手稿，也能開模</span>
          <span className="band-sub">傳照片或手稿到 LINE，標上長、寬、高、厚度，就能先拿報價。</span>
        </div>
        <LineLink source="band" className="btn-white">
          {CTA_MAIN} →
        </LineLink>
      </div>
    </section>
  );
}
