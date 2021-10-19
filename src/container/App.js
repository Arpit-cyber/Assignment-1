import React, { useMemo } from "react";
import NavBar from "../components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import { AnalysisContainer } from "./Analysis";
import { CartContainer } from "./Cart";
import { FavoriteContainer } from "./Favorite";
import { Dashboard } from "../components/Dashboard";
import { OrdersContainer } from "./Orders";
import { BrowserRouter, Redirect } from "react-router-dom";
import { CustomToast } from "../components/Toast";
import { DeleteConfirmation } from "../components/DeleteConfirmation";
import { MODALS } from "../constants";
import { isUserLoading$, selectedModal$, user$ } from "../store";
import { useSelector } from "react-redux";
import { PlaceOrder } from "../components/PlaceOrder";
import { ProductDetailsContainer } from "./ProductDetails";
import { LoginScreen } from "../components/Login";
import { RegisterScreen } from "../components/Register";
import { UserProfileContainer } from "./UserProfile";
import { isEmpty } from "lodash";
import { BuyProduct } from "../components/BuyProduct";
import { Footer } from "../components/Footer";

function App() {
  const selectedModal = useSelector(selectedModal$);
  const currentUser = useSelector(user$);

  return (
    <BrowserRouter>
      <CustomToast />
      {selectedModal === MODALS.DELETE_CONFIRMATION && <DeleteConfirmation />}
      {selectedModal === MODALS.PLACE_ORDER && <PlaceOrder />}
      {selectedModal === MODALS.BUY_PRODUCT && <BuyProduct />}
      <div className="full-width">
        <NavBar />
        <div className="custom-container">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <PageRoute isAuthenticated={!isEmpty(currentUser)} path="/cart">
              <CartContainer />
            </PageRoute>
            <PageRoute isAuthenticated={!isEmpty(currentUser)} path="/orders">
              <OrdersContainer />
            </PageRoute>
            <PageRoute isAuthenticated={!isEmpty(currentUser)} path="/favorite">
              <FavoriteContainer />
            </PageRoute>
            <PageRoute isAuthenticated={!isEmpty(currentUser)} path="/analysis">
              <AnalysisContainer />
            </PageRoute>
            <PageRoute
              isAuthenticated={!isEmpty(currentUser)}
              path="/products/:id"
            >
              <ProductDetailsContainer />
            </PageRoute>
            <PageRoute isAuthenticated={!isEmpty(currentUser)} path="/login">
              <LoginScreen />
            </PageRoute>
            <PageRoute isAuthenticated={!isEmpty(currentUser)} path="/register">
              <RegisterScreen />
            </PageRoute>
            <PageRoute isAuthenticated={!isEmpty(currentUser)} path="/profile">
              <UserProfileContainer />
            </PageRoute>
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const PageRoute = ({ path, children, isAuthenticated }) => {
  const isUserLoading = useSelector(isUserLoading$);

  const isAllowed = useMemo(
    () => isAuthenticated || isUserLoading,
    [isAuthenticated, isUserLoading]
  );

  if (isAllowed)
    return path === "/login" ? (
      <Redirect to="/" />
    ) : (
      <Route path={path}>{children}</Route>
    );
  else
    return (
      <Route path="/login">
        <LoginScreen />
      </Route>
    );
};

export default App;
