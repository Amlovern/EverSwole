import React from "react";
import LoginFormPage from "./components/LoginFormPage";
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route
      path={'/'}
      exact
      >Welcome to EverSwole</Route>
      <Route
      path={'/login'}
      exact
      >
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
