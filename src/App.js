import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
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
