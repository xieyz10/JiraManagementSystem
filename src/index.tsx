import "./why-did-you-render";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { AppProviders } from "context";
import "./index.css";
import App from "./App";
//务必在jiradevtool后引入
import "antd/dist/antd.less";
import { AuthenticatedApp } from "authenticated-app";

loadDevTools(() => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <AppProviders>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviders>
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
