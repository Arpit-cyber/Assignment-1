import React from 'react';
import NavBar from "../components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import { AnalysisContainer } from "./Analysis";
import { CartContainer } from "./Cart";
import { FavoriteContainer } from "./Favorite";
import { Dashboard } from "../components/Dashboard";
import { OrdersContainer } from "./Orders";
import { BrowserRouter } from "react-router-dom";
import { CustomToast } from "../components/Toast";
import { DeleteConfirmation } from '../components/DeleteConfirmation'
import { MODALS } from '../constants'
import { selectedModal$ } from '../store'
import { useSelector } from 'react-redux';
import { PlaceOrder } from '../components/PlaceOrder';
import { ProductDetailsContainer } from './ProductDetails';
import { LoginScreen } from '../components/Login';
import { RegisterScreen } from '../components/Register';
import { UserProfileContainer } from './UserProfile';

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
              <CartContainer />
            </Route>
            <Route path="/orders">
              <OrdersContainer />
            </Route>
            <Route path="/favorite">
              <FavoriteContainer />
            </Route>
            <Route path="/analysis">
              <AnalysisContainer />
            </Route>
            <Route path="/products/:id">
              <ProductDetailsContainer />
            </Route>
            <Route path="/login">
              <LoginScreen />
            </Route>
            <Route path="/register">
              <RegisterScreen />
            </Route>
            <Route path="/profile">
              <UserProfileContainer />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
