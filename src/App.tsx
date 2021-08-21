import React, { useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,

} from "react-router-dom";
import "./App.css";
import { Map } from "./map";
import QRCode from 'qrcode.react';
import { Base64 } from "js-base64";

const API_URL =
  window.location.host === "localhost:3000"
    ? "http://localhost:3001"
    : "https://api.covidengine.ml";

const sessionUserId = getSessionUserId();

function createSessionUserId() {
  function randNum() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] + "";
  }
  function getRandStr() {
    // 256 bit of entropy
    return btoa(
      randNum() +
        randNum() +
        randNum() +
        randNum() +
        randNum() +
        randNum() +
        randNum() +
        randNum()
    );
  }
  const randStr = getRandStr();
  localStorage.setItem("sessionUserId", randStr);
  return randStr;
}
function getSessionUserId() {
  const tmp = localStorage.getItem("sessionUserId");
  return tmp ? tmp : createSessionUserId();
}

interface ImpoverishedTransaction {
  _id: string;
  merchant: {
    name: string;
  };
  date: string;
}
interface ICoordinates {
  lat: number;
  lng: number;
}

export type LOI = {
  id: string;
  event: string;
  location: string;
  city: string;
  start: Date;
  end: Date;
  information: string;
  coordinates: ICoordinates;
  transactions: ImpoverishedTransaction[];
  eventId: string
  glnHash?: string
  gln?: string
};

function saveLois(lois: LOI[]) {
  localStorage.setItem("lois", JSON.stringify(lois));
}
function getLois(): LOI[] | null {
  const tmp = localStorage.getItem("lois");
  return JSON.parse(tmp ?? "null");
}

console.log("sessionUserId", sessionUserId);

function App() {
  // const [lois, setLois] = useState<LOI[]>([]);
  return (
    <Router>
      <Switch>
        <Route path="/transaction">
          <Transaction />
        </Route>
        <Route path="/csv">
          <CSVUpload />
        </Route>
        <Route path="/loading">
          <Loading />
        </Route>
        {/* <Route path="/issue">
          <Issue />
        </Route> */}
        <Route path="/clear">
          <Clear />
        </Route>
        <Route path="/reconcile">
          <Issue />
          {/* <Reconcile /> */}
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
          <h1>Lenny can help protect you from COVID</h1>
          <aside className="title-description">
            Forgot to scan in? Lenny can automatically check if you’ve been
            exposed to COVID with your transactions.
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

function loiToQrValue(loi: LOI) {
  const data = {
    typ: 'entry',
    gln: loi.gln,
    opn: loi.event,
    adr: loi.location,
    ver: "c19:1",
  }
  const dataStr = JSON.stringify(data)
  const b64 = Base64.encode(dataStr)
  return `NZCOVIDTRACER:${b64}`
}

function Issue() {
  const lois = useMemo(() => getLois(), []);

  if (lois === null) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <div className="App">
      <section className="container-small3">
        <h1>You might be exposed to COVID </h1>
        <aside className="title-description">
          Please stay at home and contact healthline for a COVID Test
        </aside>
        <h3>Potential Exposure Events</h3>
        <Map lois={lois} />
        <div className="hr" />
        {lois.map((loi) => (
          <>
            <p>
              <strong>
                {loi.event
                  .split(" ")
                  .slice(0, loi.event.split(" ").length - 1)
                  .join(" ")}
              </strong>
              <br />
              {loi.location}
              <br /> {new Date(loi.start).toLocaleString("en-US")} -{" "}
              {new Date(loi.end).toLocaleString("en-US")}
              {loi.gln ? <QRCode value={loiToQrValue(loi)} /> : null}

            </p>

            <div className="hr" />
          </>
        ))}

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



function CSVUpload() {
  const history = useHistory();

  
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lois, setLois] = useState(false);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("csv", selectedFile);
    formData.append("sessionUserId", sessionUserId);

    fetch(`${API_URL}/uploadcsv`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        saveLois(result.lois);
        setLois(result.lois);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };
  if (lois) {
    return (
      <Redirect
        to={{
          pathname: "/reconcile",
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="App">
        <section className="container-small2">
          <h1>Processing...</h1>
        </section>
      </div>
    );
  }

  return (
    <div className="App">
      <section className="container-small2">
        <h1>Upload a CSV</h1>
        <div className="hr" />
        <aside>
          Only ANZ and BNZ accounts are supported.
          <br/>
          <br/>
        </aside>
        <div className="grid-2">
          <input type="file" name="file" onChange={changeHandler} />
          <div>
            <button onClick={handleSubmission} disabled={!isFilePicked}>
              Submit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
