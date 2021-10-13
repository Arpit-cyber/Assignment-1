import clx from "classnames";
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
      variant="danger"
      disabled={isEmpty(currentUser)}
      className={clx("bg-orange text-white border-0", {"disabled-button": isEmpty(currentUser)})}
    >
      <FaShoppingBag /> Buy
    </Button>
  );
};
