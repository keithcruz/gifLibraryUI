import React, { Component } from "react";
import { navigate } from "@reach/router";
import { USER_URL, REDIRECT_ERROR_CODES } from "../constants";
import { Auth } from "../util/Auth";
import { Nav } from "../nav/Nav";

class RegisterPage extends Component {
  auth = new Auth();
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  register = async () => {
    if (this.state.password === this.state.confirm) {
      const headers = new Headers({
        "Content-Type": "application/json"
      });

      try {
        const email = this.state.email;
        const password = this.state.password;
        const response = await fetch(USER_URL, {
          headers,
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify({
            email,
            password
          })
        });

        if ([409, 422, ...REDIRECT_ERROR_CODES].includes(response.status)) {
          throw new Error("Registration error");
        }

        navigate("/");
        return;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.error("password not confirmed");
    }
  };

  keyPress = event => {
    if (event.keyCode === 13) {
      event.preventDefault();

      this.register();
    }
  };

  handleClick = event => {
    event.preventDefault();
    this.register();
  };

  render() {
    return (
      <>
        <Nav location={this.props.location.pathname} />
        <div className="hero-body has-background-light">
          <div>
            <div className="columns is-centered is-vcentered">
              <div className="column has-text-centered is-3">
                <h3 className="title has-text-dark">Register</h3>
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
                <div className="input-container">
                  <input
                    className="input"
                    type="password"
                    placeholder="confirm password"
                    name="confirm"
                    onChange={this.handleChange}
                    onKeyDown={this.keyPress}
                    value={this.state.confirm}
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { RegisterPage };
