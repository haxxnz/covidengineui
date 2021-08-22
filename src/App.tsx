import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import { Base64 } from "js-base64";

import { Home } from './home';

const Clear = React.lazy(() => import('./clearPage'));
const CSVUpload = React.lazy(() => import('./csvUpload'));
const Issue = React.lazy(() => import('./issuePage'));
const AllQRCodes = React.lazy(() => import('./qrCodePage'));
const Transaction = React.lazy(() => import('./transactionPage'));

export const API_URL =
  window.location.host === "localhost:3000"
    ? "http://localhost:3001"
    : "https://api.covidengine.ml";


export interface ImpoverishedTransaction {
  _id: string;
  merchant: {
    name: string;
  };
  date: string;
}
export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface ExposureLocation {
  id: string;
  event: string;
  location: string;
  start: Date;
  end: Date;
  gln?: string;
}

export interface LOI extends ExposureLocation {
  id: string;
  event: string;
  location: string;
  city: string;
  start: Date;
  end: Date;
  information: string;
  coordinates: ICoordinates;
  transactions: ImpoverishedTransaction[];
  eventId: string;
  glnHash?: string;
  gln?: string;
}

export function getLois(): LOI[] | null {
  const tmp = localStorage.getItem("lois");
  return JSON.parse(tmp ?? "null");
}

function App() {
  // const [lois, setLois] = useState<LOI[]>([]);
  return (
    <Router>
      <Switch>
        <Route path="/transaction">
          <Suspense fallback={<Loading />}>
            <Transaction />
          </Suspense>
        </Route>

        <Route path="/csv">
          <Suspense fallback={<Loading />}>
            <CSVUpload />
          </Suspense>
        </Route>
        <Route path="/loading">
          <Loading />
        </Route>
        <Route path="/clear">
          <Suspense fallback={<Loading />}>
            <Clear />
          </Suspense>
        </Route>
        <Route path="/reconcile">
          <Suspense fallback={<Loading />}>
            <Issue />
          </Suspense>
          {/* <Reconcile /> */}
        </Route>
        <Route path="/all-qr-codes">
          <Suspense fallback={<Loading />}>
            <AllQRCodes />
          </Suspense>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
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

export function loiToQrValue(exposedLocation: ExposureLocation) {
  const data = {
    typ: "entry",
    gln: exposedLocation.gln,
    opn: exposedLocation.event,
    adr: exposedLocation.location,
    ver: "c19:1",
  };
  const dataStr = JSON.stringify(data);
  const b64 = Base64.encode(dataStr);
  return `NZCOVIDTRACER:${b64}`;
}

export default App;
