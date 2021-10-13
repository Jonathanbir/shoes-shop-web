import React from "react";
import ReactDOM from "react-dom";
import Router from "Rrouter";
import { ToastContainer } from "react-toastify";
import auth from "commons/auth";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.render(
  <div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Router />
  </div>,
  document.getElementById("root")
);
