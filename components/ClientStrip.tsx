const CLIENTS = ["義豐冬瓜茶", "甜點品牌", "觀光工廠", "香氛通路", "飯店禮品部門", "小量客製創業者"];

export default function ClientStrip() {
  return (
    <section className="strip" aria-label="合作過的客戶">
      <div className="strip-inner safe-x">
        <span className="strip-label">合作過的客戶</span>
        <div className="strip-list display">
          {CLIENTS.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
