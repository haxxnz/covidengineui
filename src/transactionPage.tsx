import { Link } from "react-router-dom";
import "./App.css";
import { getSessionUserId } from "./csvUpload";

const sessionUserId = getSessionUserId();
function go () {
  if (prompt("Akahu integration is currently in private beta. Please put in a password") === "KQTPlpalH9") {
    const redirect_uri = "https://oauth.covidengine.ml/auth/akahu";
    const url = `https://oauth.akahu.io/?client_id=app_token_cksl325vd000109mjaenwgicd&response_type=code&redirect_uri=${redirect_uri}&scope=ENDURING_CONSENT&state=${sessionUserId}`;
    window.location.href = url;
  }
}

export default function Transaction() {
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
            <button className="primary" onClick={go}>Connect your Bank</button>
          </div>
          <div>
            <h2>Upload a CSV</h2>
            <aside>
              You can find this by logging into your bank on your computer -
              it’s a spreadsheet you can download.
              <br/>
              

              <br />
              We don’t store any of your bank data. <a href="https://raw.githubusercontent.com/CovidEngine/covidengineui/main/demo.csv">Demo data link</a>
            </aside>
            <Link to="/csv">
              <button className="primary">Upload CSV</button>
            </Link>
          </div>
        </div>
        <Link to="/">
          <button style={{ margin: "1rem 0 0 0" }} className="secondary">
            Back to Start
          </button>
        </Link>
      </section>
    </div>
  );
}
