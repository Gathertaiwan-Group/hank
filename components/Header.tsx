import Image from "next/image";
import LineLink from "@/components/LineLink";
import { SITE_NAME } from "@/lib/site";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner safe-x">
        <a href="#top" className="logo">
          <Image
            src="/brand/logo-header.png"
            alt={SITE_NAME}
            width={407}
            height={150}
            loading="eager"
            sizes="141px"
            className="logo-img"
          />
        </a>
        <nav className="nav" aria-label="主選單">
          <div className="nav-links">
            <a href="#works" className="hit">作品集</a>
            <a href="#process" className="hit">服務流程</a>
            <a href="#about" className="hit">關於我們</a>
            <a href="#faq" className="hit">常見問題</a>
          </div>
          <LineLink source="header" className="btn-cta btn-header">
            LINE 免費估價
          </LineLink>
        </nav>
      </div>
    </header>
  );
}
