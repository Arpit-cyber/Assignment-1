import React from "react";
import { Switch, Route } from "react-router-dom";
import CartComponent from "./components/CartComponent";
import FavoriteComponent from "./components/FavoriteComponent";
import HomeComponent from "./components/HomeComponent";
import { OrdersComponent } from "./components/OrdersComponent";

const WebRouters = () => {
  return (
    <div className="custom-container">
      <Switch>
        <Route exact path="/">
          <HomeComponent />
        </Route>
        <Route path="/cart">
          <CartComponent />
        </Route>
        <Route path="/orders">
          <OrdersComponent />
        </Route>
        <Route path="/favorite">
          <FavoriteComponent />
        </Route>
      </Switch>
    </div>
  );
};

export default WebRouters;
