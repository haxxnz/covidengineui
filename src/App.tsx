import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/transaction">
          <Transaction />
        </Route>
        <Route path="/loading">
          <Loading />
        </Route>
        <Route path="/issue">
          <Issue />
        </Route>
        <Route path="/clear">
          <Clear />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
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
          <h1>Ashley can help protect you from COVID</h1>
          <aside className="title-description">
            Forgot to scan in? Ashley can automatically check if you’ve been
            exposed to COVID with your transactions.
          </aside>
          <div className="promo-container">
            <img src="./icons/qr.svg" className="promo-icon" alt="lmao" />
            <p>Compare your bank transactions to COVID locations of interest</p>
          </div>
          <div className="promo-container">
            <img src="./icons/search.svg" className="promo-icon" alt="lmao" />

            <p>
              We only look at the last two weeks of transactions and we dont
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
        </div>
      </section>
    </div>
  );
}

function Loading() {
  return (
    <div className="App">
      <section className="container-small3">
        <div className="image-mascot">
          <img
            className="image-mascot-item"
            src="./icons/lenny.svg"
            alt="mascot"
          />
        </div>
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      </section>
    </div>
  );
}

function Issue() {
  return (
    <div className="App">
      <section className="container-small3">
        <h1>You might be exposed to COVID </h1>
        <aside className="title-description">
          Please stay at home and contact healthline for a COVID Test
        </aside>
        <h3>Potential Exposure Events</h3>

        <div className="hr" />
        <p>
          <strong>MCDonalds Grafton</strong>
          <br />
          60 Khyber Pass Road, Grafton - 6:30PM 17th August 2021{" "}
        </p>

        <div className="hr" />
        <p>
          <strong>MCDonalds Grafton</strong>
          <br />
          60 Khyber Pass Road, Grafton - 6:30PM 17th August 2021{" "}
        </p>

        <div className="hr" />
        <p>
          <strong>MCDonalds Grafton</strong>
          <br />
          60 Khyber Pass Road, Grafton - 6:30PM 17th August 2021{" "}
        </p>
        <button style={{ margin: "1.5rem 0 0 0" }} className="primary">
          Send Data to Ministry of Health
        </button>
        <button style={{ margin: "1rem 0 0 0" }} className="primary">
          Contact HealthLine
        </button>
        <Link to="/">
          <button style={{ margin: "1rem 0 0 0" }} className="secondary">
            Back to Start
          </button>
        </Link>
      </section>
    </div>
  );
}

function Clear() {
  return (
    <div className="App">
      <section className="container-small3">
        <h1 style={{ textAlign: "center" }}>All clear!</h1>
        <aside className="title-description">
          No issues found with your transactions
        </aside>

        <Link to="/">
          <button style={{ margin: "1rem 0 0 0" }} className="secondary">
            Back to Start
          </button>
        </Link>
      </section>
    </div>
  );
}

function Transaction() {
  return (
    <div className="App">
      <section className="container-small2">
        <h1>Choose an option</h1>
        <div className="hr" />
        <div className="grid-2">
          <div>
            <h2>Connect your Bank</h2>
            <aside>
              We’ll check your transactions to see if you’ve been exposed to
              COVID.
              <br />
              <br />
              We don’t store any of your bank data.
            </aside>
            <a href="https://oauth.akahu.io/?client_id=app_token_cksl325vd000109mjaenwgicd&response_type=code&redirect_uri=https://oauth.covidengine.ml/auth/akahu&scope=ENDURING_CONSENT">
              <button className="primary">Connect your Bank</button>
            </a>
          </div>
          <div>
            <h2>Upload a CSV</h2>
            <aside>
              You can find this by logging into your bank on your computer -
              it’s a spreadsheet you can download.
              <br />
              <br />
              We don’t store any of your bank data.
            </aside>
            <Link to="/csv">
              <button className="primary">Upload CSV</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;