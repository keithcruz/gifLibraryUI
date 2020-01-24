import React from "react";
import { navigate } from "@reach/router";
import { Auth } from "./util/Auth";

// HOC to wrap components that require auth token
const authedPage = Page => {
  const auth = new Auth();

  return class WrappedPage extends React.Component {
    componentDidMount() {
      try {
        if (!auth.isLoggedIn()) {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
        console.log(err);
      }
    }

    render() {
      return <Page />;
    }
  };
};

export { authedPage };
