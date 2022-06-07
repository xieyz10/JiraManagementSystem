import styled from "@emotion/styled";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import { AuthenticatedApp } from "authenticated-app";
import { FullPageErrorFallBack } from "conponents/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import { Route, Routes } from "react-router";
import { UnAuthenticatedApp } from "unauthenticated-app";
import "./App.css";

const App = () => {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
};

export default App;
