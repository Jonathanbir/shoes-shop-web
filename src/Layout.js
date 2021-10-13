import React, { useMemo } from "react";
import Header from "components/organisms/Header";

const Layout = (props) => {
  const user = useMemo(() => {
    return global.auth.getUser() || {};
  }, []);
  console.log("user", user);
  return (
    <div className="main">
      <Header user={user} />
      {props.children}
    </div>
  );
};
export default Layout;
