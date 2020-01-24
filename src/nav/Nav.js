import React from "react";
import { Link } from "@reach/router";
import { LOGIN_PATHS } from "../constants";

const Nav = ({ location }) => {
  const isLogin = LOGIN_PATHS.includes(location);

  return (
    <>
      <div className="hero-head">
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
                    {isLogin ? (
                      <>
                        <li>
                          <Link to="/register">Register</Link>{" "}
                        </li>
                        <li>
                          <Link to="/login">Login</Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="is-active">
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/search">Search</Link>
                        </li>
                      </>
                    )}
                  </ul>
                  <span className="navbar-item">
                    <a
                      className="button is-white is-outlined"
                      href="https://github.com/keithcruz/gifLibraryUI"
                    >
                      View Source
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="hero-title gif-title">
        <div className="content">
          <div className="level">
            <div className="level-item">
              <h2 className="subtitle">search and save your favorite gifs</h2>
            </div>
          </div>
        </div>
        {/* {this.auth.isLoggedIn() && (
      <button onClick={() => this.handleLogout()}>Logout</button>
    )} */}
      </div>
    </>
  );
};

export { Nav };
