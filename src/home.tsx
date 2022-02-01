import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="App">
      <section className="container-small">
        <div className="image-mascot">
          <img
            className="image-mascot-item"
            src="./icons/lenny.svg"
            alt="mascot"
          />
        </div>
        <div>
          <h1>Lenny can help protect you from COVID</h1>
          <aside className="title-description">
            Forgot to scan in? Lenny can automatically check if you’ve been
            exposed to COVID with your transactions. <br /> <br />
            Built as part of of the{" "}
            <a href="https://govhack.org/" target="_blank">
              GovHack 2021 Open Data Hackathon
            </a>
            . This project is no longer maintained so your mileage may vary!
          </aside>
          <div className="promo-container">
            <img src="./icons/qr.svg" className="promo-icon" alt="lmao" />
            <p>Compare your bank transactions to COVID locations of interest</p>
          </div>
          <div className="promo-container">
            <img src="./icons/search.svg" className="promo-icon" alt="lmao" />

            <p>
              We only look at the last two weeks of transactions and we don't
              store your data
            </p>
          </div>
          <div className="promo-container">
            <img src="./icons/shield.svg" className="promo-icon" alt="lmao" />
            <p>
              Your data is anonymised and protected with military grade
              encryption
            </p>
          </div>

          <Link to="/transaction">
            <button className="primary">Get Started</button>
          </Link>
          <br />
          <br />
          <Link to="/all-qr-codes">
            <button className="secondary">All QR Codes</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
