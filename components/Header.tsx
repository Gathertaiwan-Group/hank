import LineLink from "@/components/LineLink";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner safe-x">
        <a href="#top" className="logo hit">
          <span className="logo-zh serif">Hank 藝術模具</span>
          <span className="logo-en">HANK ART MOLDS</span>
        </a>
        <nav className="nav" aria-label="主選單">
          <div className="nav-links">
            <a href="#works" className="hit">作品集</a>
            <a href="#process" className="hit">服務流程</a>
            <a href="#about" className="hit">關於我們</a>
            <a href="#faq" className="hit">常見問題</a>
          </div>
          <LineLink source="header" className="btn-line btn-header">
            LINE 免費諮詢
          </LineLink>
        </nav>
      </div>
    </header>
  );
}
