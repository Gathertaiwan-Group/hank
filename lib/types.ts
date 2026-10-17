export type Work = {
  slug: string;
  cat: string;
  title: string;
  body: string;
  /** 已解析好、可直接給 next/image 的網址（/works/xxx 或 https://...） */
  img: string;
};
