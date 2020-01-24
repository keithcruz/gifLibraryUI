import jwt_decode from "jwt-decode";
import { navigate } from "@reach/router";
import { LOGIN_URL } from "../constants/Users";

class Auth {
  login = async (email, password) => {
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    try {
      const response = await fetch(LOGIN_URL, {
        headers,
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      });

      const responseJson = await response.json();

      this.setToken(responseJson.tokens.token);

      navigate("/");
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
}

export { Auth };
