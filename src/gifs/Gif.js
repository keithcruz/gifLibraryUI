import React from "react";

const Gif = props => (
  <React.Fragment>
    <img src={props.gif} alt="gif" />
  </React.Fragment>
);

export { Gif };
