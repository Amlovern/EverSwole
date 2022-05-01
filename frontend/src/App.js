import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])
  return isLoaded && (
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
      <Route
      path={'/signup'}
      exact
      >
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
