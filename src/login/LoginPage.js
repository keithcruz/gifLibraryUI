import React, { Component } from "react";
import { navigate } from "@reach/router";
import { Auth } from "../util/Auth";

class LoginPage extends Component {
  auth = new Auth();

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  keyPress = event => {
    if (event.keyCode === 13) {
      event.preventDefault();

      this.auth.login(this.state.email, this.state.password);
    }
  };

  handleClick = event => {
    event.preventDefault();

    this.auth.login(this.state.email, this.state.password);
  };

  componentDidMount() {
    if (this.auth.isLoggedIn()) {
      navigate("/");
    }
  }

  render() {
    return (
      <div className="container auth-container">
        <div className="columns is-centered is-vcentered">
          <div className="column has-text-centered">
            <h3 className="title has-text-dark">Login</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="input-container">
                <input
                  className="input"
                  type="email"
                  placeholder="enter your email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  className="input"
                  type="password"
                  placeholder="enter a password"
                  name="password"
                  onChange={this.handleChange}
                  onKeyDown={this.keyPress}
                  value={this.state.password}
                  required
                />
              </div>
              <div>
                <button
                  className="button is-primary"
                  type="button"
                  onClick={this.handleClick}
                >
                  Go!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export { LoginPage };
