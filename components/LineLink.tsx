"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { LINE_URL, type LineSource } from "@/lib/site";
import { trackLine } from "@/lib/trackLine";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel" | "onClick"> & {
  source: LineSource;
  workSlug?: string;
  /** 按鈕前加 LINE 綠對話泡泡小圖示（黃底按鈕也一眼看出「點了是 LINE」）；浮動鈕自帶樣式，關掉 */
  icon?: boolean;
  children: ReactNode;
};

/** 自繪的簡易對話泡泡（非 LINE 官方商標圖檔），綠底白泡泡 */
export function LineIcon() {
  return (
    <svg className="line-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="7" fill="#06C755" />
      <path
        d="M12 5.5c-4 0-7.2 2.5-7.2 5.6 0 2.8 2.5 5.1 5.9 5.5.4.1.5.3.4.7l-.2 1.2c-.1.4.2.6.6.4 2.6-1.4 5-3.2 6.4-5 .9-1 1.3-2 1.3-2.8 0-3.1-3.2-5.6-7.2-5.6Z"
        fill="#fff"
      />
    </svg>
  );
}

export default function LineLink({ source, workSlug, icon = true, children, ...rest }: Props) {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener"
      onClick={() => trackLine(source, workSlug)}
      {...rest}
    >
      {icon && <LineIcon />}
      {children}
    </a>
  );
}
