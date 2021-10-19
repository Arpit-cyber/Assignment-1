import classNames from "classnames";
import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchAllUsers, register } from "../../services";
import { isUserLoading$ } from "../../store";
import "./register.css";

const emptyObject = {};
const emailRegex = /[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+$/;

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isUserLoading = useSelector(isUserLoading$);
  const [userDetails, setUserDetails] = useState(emptyObject);
  const [validation, setValidation] = useState(emptyObject);

  const handleRegistration = () => {
    const { fname, lname, email, pass } = userDetails;

    setValidation(emptyObject);

    if (!fname || !lname || !emailRegex.test(email) || !pass) {
      setValidation({
        fname: !fname,
        lname: !lname,
        email: !emailRegex.test(email),
        pass: !pass,
      });
    } else {
      const user = {
        name: fname + " " + lname,
        email,
        pass,
        isAuthenticated: true,
      };

      dispatch(register(user)).then(() => {
        dispatch(fetchAllUsers());
        history.push("/");
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRegistration();
    }
  };

  return (
    !isUserLoading && (
      <div className="wrapper">
        <Card className="register-card">
          <Card.Body className="d-flex flex-column align-items-center">
            <h4 className="mb-30">Sign Up</h4>
            <Row className="user-name-field-wrapper">
              <Col sm={12} md={6}>
                <Form.Control
                  required
                  type="text"
                  placeholder="First Name"
                  className={classNames({
                    "mb-20": !validation?.fname,
                    "error-field": validation?.fname,
                  })}
                  value={userDetails?.fname}
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      fname: e.target.value,
                    }))
                  }
                />
                {validation?.fname && (
                  <div className="error-message">First Name required</div>
                )}
              </Col>
              <Col sm={12} md={6}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last Name"
                  className={classNames({
                    "mb-20": !validation?.lname,
                    "error-field": validation?.lname,
                  })}
                  value={userDetails?.lname}
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      lname: e.target.value,
                    }))
                  }
                />
                {validation?.lname && (
                  <div className="error-message">Last Name required</div>
                )}
              </Col>
            </Row>
            <Form.Control
              type="email"
              required
              placeholder="Email Address"
              className={classNames({
                "mb-20": !validation?.email,
                "error-field": validation?.email,
              })}
              value={userDetails?.email}
              onKeyDown={handleKeyDown}
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {validation?.email && (
              <div className="error-message">Email required</div>
            )}
            <Form.Control
              type="password"
              required
              placeholder="Password"
              className={classNames({
                "mb-20": !validation?.pass,
                "error-field": validation?.pass,
              })}
              value={userDetails?.pass}
              onKeyDown={handleKeyDown}
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, pass: e.target.value }))
              }
            />
            {validation?.pass && (
              <div className="error-message">Password required</div>
            )}

            <Button
              variant="primary"
              className="mb-20 mt-20 sign-up-btn"
              onClick={handleRegistration}
            >
              Sign Up
            </Button>

            <div className="signin-section">
              <Button
                variant="link"
                className="back-link"
                onClick={() => history.push("/login")}
              >
                <span className="back-arrow">&larr;</span> Go Back to Login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  );
};
