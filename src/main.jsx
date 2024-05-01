import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import 'rsuite/dist/rsuite.min.css';
import "./main.css";
import "react-toastify/dist/ReactToastify.css";
import Test from "./test";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
