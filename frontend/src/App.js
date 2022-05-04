import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import ExercisesPage from "./components/Exercises";
import WorkoutPage from "./components/Workouts";
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
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
          <Route
          path={'/exercises'}>
            <ExercisesPage />
          </Route>
          <Route
          path={'/workouts'}>
            <WorkoutPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
