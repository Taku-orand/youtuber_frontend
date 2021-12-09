import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Login } from "../components/page/Login"
import { routes } from "./Routes";
import { Header } from "../components/organisms/layout/Header";
import { Page404 } from "../components/page/Page404";

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/youtuber" />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route
        path="/youtuber"
        render={({ match: { url } }) => (
          <Switch>
            {routes.map((route) => (
              <Route
              key={route.path}
              exact={route.exact}
              path={`${url}${route.path}`}
              >
                <Header />
                { route.children }
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
};
