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
import { DeleteConfirmation } from '../components/DeleteConfirmation'
import { MODALS } from '../constants'
import { selectedModal$ } from '../store'
import { useSelector } from 'react-redux';
import { PlaceOrder } from '../components/PlaceOrder';
import { ProductDetails } from '../components/ProductDetails';
import { LoginScreen } from '../components/Login';
import { RegisterScreen } from '../components/Register';

function App() {
  const selectedModal = useSelector(selectedModal$);

  return (
    <BrowserRouter>
      <CustomToast />
      {selectedModal === MODALS.DELETE_CONFIRMATION && <DeleteConfirmation />}
      {selectedModal === MODALS.PLACE_ORDER && <PlaceOrder />}
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
            <Route path="/products/:id">
              <ProductDetails />
            </Route>
            <Route path="/login">
              <LoginScreen />
            </Route>
            <Route path="/register">
              <RegisterScreen />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
