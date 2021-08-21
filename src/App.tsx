import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/transaction">
          <Transaction />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>



  );
}


function Home() {
  return <div className="App">
    <section className='container-small'>
      <div></div>
      <div>

        <h1>Lenny can help protect you from COVID</h1>
        <aside className='title-description'>Forgot to scan in? Lenny can automatically check if you’ve been exposed to COVID with your transactions.</aside>
        <div className='promo-container'>
          <img src='./icons/qr.svg' className='promo-icon' alt='lmao' />
          <p>Compare your bank transactions to COVID locations of interest</p>
        </div>
        <div className='promo-container'>
          <img src='./icons/search.svg' className='promo-icon' alt='lmao' />

          <p>We only look at the last two weeks of transactions and we dont store your data</p>
        </div>
        <div className='promo-container'>
          <img src='./icons/shield.svg' className='promo-icon' alt='lmao' />
          <p>Your data is anonymised and protected with military grade encryption</p>
        </div>

        <Link to="/transaction"><button className="primary">Get Started</button></Link>
      </div>
    </section>
  </div>
}

function About() {
  return <div className="App">
    <section className='container-small'>aaa</section></div>;
}

function Transaction() {
  return <div className="App">
    <section className='container-small2'>
      <h1>Choose an option</h1>
      <div className="hr" />
      <div className="grid-2">
        <div><h2>Connect your Bank</h2><aside>We’ll check your transactions to see if you’ve been exposed to COVID.<br /><br />We don’t store any of your bank data.</aside>
          <Link to="/transaction"><button className="primary">Get Started</button></Link></div>
        <div><h2>Upload a CSV</h2><aside>You can find this by logging into your bank on your laptop - it’s a spreadsheet you can download.
          <br /><br />We don’t store any of your bank data.</aside>
          <Link to="/transaction"><button className="primary">Get Started</button></Link></div>
      </div>


    </section></div>;
}


export default App;
