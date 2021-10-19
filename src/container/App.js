import React from "react";
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
import { selectedModal$, user$ } from "../store";
import { useSelector } from "react-redux";
import { PlaceOrder } from "../components/PlaceOrder";
import { ProductDetailsContainer } from "./ProductDetails";
import { LoginScreen } from "../components/Login";
import { RegisterScreen } from "../components/Register";
import { UserProfileContainer } from "./UserProfile";
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
            <PageRoute
              isAuthenticated={currentUser?.isAuthenticated}
              path="/cart"
            >
              <CartContainer />
            </PageRoute>
            <PageRoute
              isAuthenticated={currentUser?.isAuthenticated}
              path="/orders"
            >
              <OrdersContainer />
            </PageRoute>
            <PageRoute
              isAuthenticated={currentUser?.isAuthenticated}
              path="/favorite"
            >
              <FavoriteContainer />
            </PageRoute>
            <PageRoute
              isAuthenticated={currentUser?.isAuthenticated}
              path="/analysis"
            >
              <AnalysisContainer />
            </PageRoute>
            <Route path="/products/:id">
              <ProductDetailsContainer />
            </Route>
            <PageRoute
              isAuthenticated={currentUser?.isAuthenticated}
              path="/login"
            >
              <LoginScreen />
            </PageRoute>
            <PageRoute
              isAuthenticated={currentUser?.isAuthenticated}
              path="/register"
            >
              <RegisterScreen />
            </PageRoute>
            <PageRoute
              isAuthenticated={currentUser?.isAuthenticated}
              path="/profile"
            >
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
  if (isAuthenticated) {
    if (path === "/login" || path === "/register") return <Redirect to="/" />;
    return <Route path={path}>{children}</Route>;
  } else {
    if (path === "/login") {
      return (
        <Route path="/login">
          <LoginScreen />
        </Route>
      );
    } else if (path === "/register") {
      return (
        <Route path="/register">
          <RegisterScreen />
        </Route>
      );
    } else {
      <Redirect to="/" />;
    }
  }
};

export default App;
