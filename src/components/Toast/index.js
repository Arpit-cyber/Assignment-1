import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alert$, setAlert } from "../../store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CustomToast = () => {
  const dispatch = useDispatch();
  const message = useSelector(alert$);

  useEffect(() => {
    if(message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(setAlert())
    }
  }, [dispatch, message])

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
