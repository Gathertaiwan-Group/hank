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
          <h2 className="about-h2 serif">
            幫設計師與品牌，
            <br />
            把圖案做成模具
          </h2>
          <p className="about-p">
            從一張手稿、LOGO 或圖案開始，經過 3D 建模、3D 列印母模、矽膠翻模，做成能用在食品、香氛、石膏的模具。
          </p>
          <p className="about-p">合作過甜點品牌、觀光工廠、香氛通路與飯店禮品部門，也擅長幫創業者做小量客製。</p>
          <p className="about-p">我們的建議是：先找現成的公版模具，找不到合適的再客製。</p>
        </div>
      </div>
    </section>
  );
}
