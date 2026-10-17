import type { ReactNode } from "react";

/** 「義豐冬瓜茶：造型冬瓜糖模具」→ 只在全形冒號後換行，避免把詞拆開 */
export function splitTitle(title: string): ReactNode {
  const parts = title.split(/(?<=：)/);
  if (parts.length < 2) return title;
  return parts.map((p, i) => (
    <span key={i} className="nb">
      {p}
    </span>
  ));
}
