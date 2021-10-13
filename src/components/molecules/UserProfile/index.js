import React from "react";

const UserProfile = (props) => {
  const logout = () => {
    global.auth.isLogout();
    props.close("logout");
  };

  return (
    <div className="user-profile">
      <p className="title has-text-centered">Profile</p>
      <fieldset disabled>
        <div className="field">
          <label className="label">Nickname</label>
          <div className="control">
            <input
              className="input"
              type="text"
              defaultValue={props.nickname}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="text" defaultValue={props.email} />
          </div>
        </div>
        <div className="field">
          <label className="label">Type</label>
          <div className="control">
            <input
              className="input"
              type="text"
              defaultValue={props.type === 1 ? "Manager" : "General User"}
            />
          </div>
        </div>
      </fieldset>
      <br />
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-danger" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="control">
          <button
            className="button"
            type="button"
            onClick={() => {
              props.close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
