import { useMemo } from "react";
import {
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Map } from "./map";
import QRCode from "qrcode.react";
import { getLois, loiToQrValue } from './App';

export default function Issue() {
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
      <div className="grid-map-2">
        <Map lois={lois} />
        <section className="container-small4">
          <h1>You might be exposed to COVID </h1>
          <aside className="title-description">
            Please stay at home and contact healthline for a COVID Test
          </aside>
          <div className="hide-desktop">
            <button style={{ margin: "1rem 0 0 0" }} className="primary">
              Send Data to Ministry of Health
            </button>
            <a href="tel:08003585453">
              <button style={{ margin: "0.5rem 0 0 0" }} className="primary">
                Contact HealthLine
              </button>
            </a>
          </div>

          <div className="hr" />
          <h2 style={{ margin: "0 0 0.5rem 0" }}>
            {lois.length} Potential Exposure Events
          </h2>
          <p>
            Please review these exposure events. You can scan the QR codes to
            import missed scan-ins into your NZ Covid Tracer app
          </p>
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
        </section>
      </div>
    </div>
  );
}

