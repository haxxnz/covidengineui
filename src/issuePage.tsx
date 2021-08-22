import { useEffect, useState } from "react";
import {
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Map } from "./map";
import QRCode from "qrcode.react";
import { API_URL, getLois, LOI, loiToQrValue } from './App';
import { getSessionUserId } from './csvUpload';
import {
  Link,
} from "react-router-dom";

const sessionUserId = getSessionUserId();
export default function Issue() {
  const fromAkahu = new URL(document.location.href).searchParams.get(
    "fromAkahu"
  );
  const [lois, setLois] = useState<null | undefined | LOI[]>(undefined);
  useEffect(() => {
    async function fetchLois() {
      if (fromAkahu) {
        const res = await fetch(
          `${API_URL}/mylois?sessionUserId=${sessionUserId}`
        );
        const result = await res.json();
        setLois(result.lois);
      } else {
        setLois(getLois());
      }
    }
    fetchLois();
  }, [fromAkahu]);

  if (typeof lois === "undefined") {
    return (
      <div className="App">
        <div className="grid-map-2">
          <section className="container-small4">
            <h1>Loading... </h1>
          </section>
        </div>
      </div>
    );
  }

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
      <div className="grid-map-2">
        <Map lois={lois} />
        <section className="container-small4">
          {lois.length ? <h1>You might be exposed to COVID </h1> : <h1>All clear</h1>}
          {lois.length ? <aside className="title-description">Please stay at home and contact healthline for a COVID Test</aside> : null}
          <div className="hide-desktop">
            {lois.length ? <>
            <button style={{ margin: "1rem 0 0 0" }} className="primary" onClick={() => alert('Please scan the QR codes, set the dates you\'ve been at those locations, go to My data -> Share my digital diary')}>
              Send Data to Ministry of Health
            </button>
            <a href="tel:08003585453">
              <button style={{ margin: "0.5rem 0 0 0" }} className="primary">
                Contact HealthLine
              </button>
            </a>
            </> : null}

          </div>

          <div className="hr" />
          <h2 style={{ margin: "0 0 0.5rem 0" }}>
            {lois.length} Potential Exposure Events
          </h2>
          {lois.length ? <p>
            Please review these exposure events. You can scan the QR codes to
            import missed scan-ins into your NZ Covid Tracer app
          </p> : null}
          <div className="hr" />
          {lois.map((loi) => (
            <>
              <p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>
                      {loi.event
                        .split(" ")
                        .slice(0, loi.event.split(" ").length - 1)
                        .join(" ")}
                    </strong>
                    <p style={{ color: "#444" }}>
                      {loi.location}

                      <div>
                        {new Date(loi.start).toLocaleDateString()}{" "}
                        {new Date(loi.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        - {new Date(loi.end).toLocaleDateString()}{" "}
                        {new Date(loi.end).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </p>
                    <div>
                      <br />
                      You might have been here at:
                      <ul>
                        {loi.transactions.map((transaction) => {
                          return (
                            <li>
                              <>
                                {new Date(
                                  transaction.date
                                ).toLocaleDateString()}
                              </>
                              &nbsp;({transaction.merchant.name})
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div>
                    {loi.gln ? (
                      <QRCode value={loiToQrValue(loi)} />
                    ) : (
                      <div
                        style={{
                          width: 128,
                          height: 128,
                          border: "1px solid black",
                          display: "flex",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        QR code not available
                      </div>
                    )}
                  </div>
                </div>
              </p>

              <div className="hr" />
            </>
          ))}
          <Link to="/">
            <button style={{ margin: "0.5rem 0 0 0" }} className="secondary">
              Back to Start
            </button>
          </Link>

        </section>
      </div>
    </div>
  );
}

