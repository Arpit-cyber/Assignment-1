import classNames from "classnames";
import { isEmpty } from "lodash";
import React from "react";
import Button from "react-bootstrap/Button";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { user$ } from "../../../store";

export const BuyButton = () => {
  const currentUser = useSelector(user$);

  return (
    <Button
      className="bg-orange text-white border-0"
      variant="danger"
      disabled={isEmpty(currentUser)}
      className={classNames({"disabled-button": isEmpty(currentUser)})}
    >
      <FaShoppingBag /> Buy
    </Button>
  );
};
