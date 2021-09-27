import React from "react";
import { Switch, Route } from "react-router-dom";
import CartComponent from "./components/CartComponent";
import HomeComponent from "./components/HomeComponent";

const WebRouters = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomeComponent />
      </Route>
      <Route path="/cart">
        <CartComponent />
      </Route>
    </Switch>
  );
};

export default WebRouters;
