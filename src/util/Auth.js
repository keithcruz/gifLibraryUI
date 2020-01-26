import jwt_decode from "jwt-decode";
import { navigate } from "@reach/router";
import { LOGIN_URL, REDIRECT_ERROR_CODES, GIFS_URL } from "../constants";

class Auth {
  login = async (email, password) => {
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    try {
      const response = await fetch(LOGIN_URL, {
        headers,
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      });

      if (REDIRECT_ERROR_CODES.includes(response.status)) {
        throw new Error("Authorization error");
      }

      navigate("/");
      return;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  setToken = token => {
    localStorage.setItem("token", token);
  };

  getToken = () => {
    return localStorage.getItem("token");
  };

  tokenExpired = token => {
    try {
      const decoded = jwt_decode(token);
      const expiration = decoded.exp;
      return expiration < Date.now() / 1000;
    } catch (err) {
      console.log(err);
    }
  };

  isLoggedIn = () => {
    const token = this.getToken();
    if (token) {
      return !this.tokenExpired(token);
    }

    return false;
  };

  logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  getUserInfo = () => {
    return jwt_decode(this.getToken()).identity;
  };

  getCsrfToken = () => {
    if (!document.cookie) {
      return null;
    }

    const foundCookies = document.cookie
      .split(";")
      .map(c => c.trim())
      .filter(c => c.startsWith("csrf_access_token="));

    if (foundCookies.length === 0) {
      return null;
    }
    return decodeURIComponent(foundCookies[0].split("=")[1]);
  };

  request = async (url, params, headers) => {
    const csrfToken = this.getCsrfToken();

    headers.append("X-CSRF-TOKEN", csrfToken);

    const response = await fetch(url, {
      ...params,
      credentials: "include",
      headers
    });

    if (REDIRECT_ERROR_CODES.includes(response.status)) {
      navigate("/login");
      throw new Error("Authorization error");
    }

    const responseJson = await response.json();

    return responseJson;
  };

  gifSearch = async query => {
    const csrfToken = this.getCsrfToken();
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken
    });

    const response = await fetch(`${GIFS_URL}?q=${query}`, {
      method: "GET",
      credentials: "include",
      headers
    });

    if (REDIRECT_ERROR_CODES.includes(response.status)) {
      navigate("/login");
      throw new Error("Authorization error");
    }

    const responseJson = await response.json();

    return responseJson;
  };
}

export { Auth };
