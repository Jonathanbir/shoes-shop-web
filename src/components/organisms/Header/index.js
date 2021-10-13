import React from "react";
import { Link, withRouter } from "react-router-dom";
import Panel from "components/organisms/Panel";
import UserProfile from "components/molecules/UserProfile";

import "./index.scss";

const Header = (props) => {
  const toProfile = () => {
    Panel.open({
      component: UserProfile,
      props: props.user,
      callback: (data) => {
        console.log("data", data);
        if (data === "logout") {
          props.history.go(0);
        }
      },
    });
  };

  return (
    <div className="header-wrapper">
      <div className="grid">
        <div className="start">
          <a href="/">Home</a>
        </div>
        <div className="end">
          {props.user.nickname ? (
            <>
              <i className="far fa-user"></i>
              <span className="nick-name" onClick={toProfile}>
                {props.user.nickname}
              </span>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default withRouter(Header);
