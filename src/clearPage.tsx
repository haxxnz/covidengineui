import { Link } from "react-router-dom";

export default function Clear() {
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
