import React from 'react';
import NavBar from "../components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import { AnalysisComponent } from "../components/Analysis";
import { CartComponent } from "../components/Cart";
import { FavoriteComponent } from "../components/Favorite";
import { Dashboard } from "../components/Dashboard";
import { OrdersComponent } from "../components/Orders";
import { BrowserRouter } from "react-router-dom";
import { CustomToast } from "../components/Toast";

function App() {
  return (
    <BrowserRouter>
      <CustomToast />
      <div className="full-width">
        <NavBar />
        <div className="custom-container">
          <Switch>
            <Route exact path="/">
              <Dashboard />
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
            <Route path="/analysis">
              <AnalysisComponent />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
