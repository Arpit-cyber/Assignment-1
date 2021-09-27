import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../reducers/Dashboard.slice";
import { products$ } from "../selectors/Dashboard.selectors";
import axios from "axios";
import Carousal from "../widgets/Carousal";
import CardComponent from "./CardComponents";

export default function HomeComponent() {
  const dispatch = useDispatch();
  const products = useSelector(products$);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => dispatch(setProducts(res.data)));
  }, [dispatch]);

  return (
    <div className="custom-container">
      <Carousal />
      <div className="m-2">
        <Row>
          {products.map((product) => (
            <Col sm={12} md={3} key={product.id}>
              <CardComponent product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
