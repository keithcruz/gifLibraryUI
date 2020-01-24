import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
// import { SearchPage } from "search/SearchPage";
import { LoginPage } from "./login/LoginPage";
// import { RegisterPage } from "register/RegisterPage";
import { HomePage } from "./home/HomePage";
import { Auth } from "./util/Auth";

class App extends Component {
  auth = new Auth();

  handleLogout = () => {
    this.auth.logout();
  };

  render() {
    return (
      <section className="hero is-medium is-primary">
        {/* <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <div className="content">
                  <h2 className="brand">GifLibrary</h2>
                </div>
                <span className="navbar-burger burger" data-target="navbarMenu">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end">
                  <div className="tabs is-right">
                    <ul>
                      {this.auth.isLoggedIn() ? (
                        <>
                          <li className="is-active">
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link to="/search">Search</Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link to="/register">Register</Link>{" "}
                          </li>
                          <li>
                            <Link to="/login">Login</Link>
                          </li>
                        </>
                      )}
                    </ul>
                    <span className="navbar-item">
                      <a
                        className="button is-white is-outlined"
                        href="https://github.com/BulmaTemplates/bulma-templates/blob/master/templates/hero.html"
                      >
                        View Source
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div> */}
        {/* <div className="hero-title">
          <div className="content">
            <div className="level">
              <div className="level-item">
                <h2 className="subtitle">search and save your favorite gifs</h2>
              </div>
            </div>
          </div> */}
        {/* {this.auth.isLoggedIn() && (
            <button onClick={() => this.handleLogout()}>Logout</button>
          )} */}
        {/* </div> */}
        <Router>
          {/* <SearchPage path="/search" /> */}
          <LoginPage path="/login" />
          {/* <RegisterPage path="/register" /> */}
          <HomePage path="/" />
        </Router>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
