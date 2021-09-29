import React from "react";
import { useDispatch } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import { setAlert } from "../reducers";
import { addToCart, fetchCart } from "../infra";

const CardComponent = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddCart = (product) => {
    dispatch(addToCart(product)).then(() => {
      dispatch(fetchCart());
      dispatch(setAlert("Item added to cart!"));
    })
  }

  return (
    <Card className="custom-card" key={product.id}>
      <Card.Img variant="top" src={product.avatar} width="80px" height="300px" />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="truncate">{product.name}</Card.Title>
        <Card.Text className="f-12">Price: ₹ {product.price}</Card.Text>
        <div className="d-flex flex-row justify-content-between">
          <Button
            variant="warning"
            onClick={() => handleAddCart(product)}
          >
            <FaShoppingCart /> Add
          </Button>
          <Button className="bg-orange text-white border-0" variant="danger">
            <FaShoppingBag /> Buy
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
