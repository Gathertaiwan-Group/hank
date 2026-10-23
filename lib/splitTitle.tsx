import { Fragment, type ReactNode } from "react";

/**
 * 作品標題斷行：把標題切成「詞組」，每組包成 inline-block（.nb），
 * 瀏覽器只能在詞組之間換行，避免「奶｜酪」「慕｜斯」「造｜型」這種拆詞。
 *
 * 可換行的位置：
 *   - 全形冒號／頓號之後（義豐冬瓜茶：｜造型冬瓜糖模具）
 *   - 「造型」「圖騰」「圖紋」之後（角色造型｜奶酪布丁模具）
 *   - 英數與中文之間的空白（地標與 LOGO ｜造型冰棒模具）
 * 太短（<3 字）的詞組併入下一組，避免「造型」單獨一行。
 * 單一詞組若比容器還寬，inline-block 仍會在內部自然換行，不會溢出。
 */
const BREAK_AFTER = /(?<=[：、]|造型|圖騰|圖紋|[A-Za-z0-9] )(?=\S)/u;

export function titleChunks(title: string): string[] {
  const raw = title.split(BREAK_AFTER).filter(Boolean);
  const out: string[] = [];
  let carry = "";
  for (const part of raw) {
    const chunk = carry + part;
    if (chunk.trim().length < 3) {
      carry = chunk;
      continue;
    }
    out.push(chunk);
    carry = "";
  }
  if (carry) {
    if (out.length) out[out.length - 1] += carry;
    else out.push(carry);
  }
  return out;
}

export function splitTitle(title: string): ReactNode {
  const parts = titleChunks(title);
  if (parts.length < 2) return title;
  // 詞組尾端的空白放在 span 外：inline-block 內的尾端空白會被吃掉，變成「LOGO造型」
  return parts.map((p, i) => (
    <Fragment key={i}>
      <span className="nb">{p.trimEnd()}</span>
      {p !== p.trimEnd() && " "}
    </Fragment>
  ));
}
