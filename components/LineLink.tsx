"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { LINE_URL, type LineSource } from "@/lib/site";
import { trackLine } from "@/lib/trackLine";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel" | "onClick"> & {
  source: LineSource;
  workSlug?: string;
  children: ReactNode;
};

export default function LineLink({ source, workSlug, children, ...rest }: Props) {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener"
      onClick={() => trackLine(source, workSlug)}
      {...rest}
    >
      {children}
    </a>
  );
}
