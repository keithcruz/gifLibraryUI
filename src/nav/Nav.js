import React from "react";
import { Link, navigate } from "@reach/router";
import { LOGIN_PATHS, LOGOUT_URL } from "../constants";

const Nav = ({ location }) => {
  const isLogin = LOGIN_PATHS.includes(location);

  const handleClick = async event => {
    event.preventDefault();
    try {
      await fetch(LOGOUT_URL, {
        method: "POST"
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

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
                          <Link to="/register">Register</Link>
                        </li>
                        <li>
                          <Link to="/login">Login</Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/search">Search</Link>
                        </li>
                        <li>
                          <a onClick={handleClick}>Logout</a>
                        </li>
                      </>
                    )}
                  </ul>
                  <span className="navbar-item">
                    <a
                      className="button is-white is-outlined"
                      href="https://github.com/keithcruz/gifLibraryUI"
                      target="_blank"
                      rel="noopener noreferrer"
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
      </div>
    </>
  );
};

export { Nav };
