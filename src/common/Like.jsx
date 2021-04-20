import React, { Component } from "react";
const Like = () => {
  let classes = "fa fa-heart";
  if (!this.props.liked) classes += "-o";
  return (
    <React.Fragment>
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      ></i>
    </React.Fragment>
  );
};

export default Like;
