import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-inner safe-x">
        <Image
          src="/images/about.png"
          alt="Hank 藝術模具"
          width={1024}
          height={1536}
          sizes="(max-width: 940px) calc(100vw - 40px), 552px"
          className="about-img"
        />
        <div className="about-text">
          <span className="eyebrow">關於我們</span>
          <h2 className="about-h2 serif">專為設計師與品牌主提供「造型模具開發」的專業團隊</h2>
          <p className="about-p">
            從一張手稿、Logo、創意圖案開始，透過3D建模、模樣列印與矽膠翻模，一步步將靈感轉化為可用於食品、香氛、石膏等領域的真實商品。
          </p>
          <p className="about-p">
            我們曾與甜點品牌、觀光工廠、香氛通路、飯店禮品部門合作，也擅長協助創業者以小量客製創造差異化商品，你只要帶著想法，我們就能幫你做出你想要的「第一個模具」。
          </p>
        </div>
      </div>
    </section>
  );
}
