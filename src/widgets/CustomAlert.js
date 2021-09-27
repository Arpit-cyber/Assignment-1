import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { alert$ } from "../selectors/Dashboard.selectors";
import { setAlert } from "../reducers/Dashboard.slice";

export default function CustomAlert() {
  const dispatch = useDispatch();
  const message = useSelector(alert$);

  useEffect(() => {
    if (message) setTimeout(() => dispatch(setAlert()), 3000);
  }, [dispatch, message]);

  return (
    <Alert
      variant="success"
      onClose={() => dispatch(setAlert())}
      dismissible
      className="custom-alert"
    >
      <p>{message}</p>
    </Alert>
  );
}
