import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { itemToBeSearch$, products$ } from "../selectors";
import Carousal from "../widgets/Carousal";
import CardComponent from "./CardComponents";
import { fetchProducts, fetchSales } from "../infra";

export default function HomeComponent() {
  const dispatch = useDispatch();
  const products = useSelector(products$);
  const itemToBeSearch = useSelector(itemToBeSearch$)
  const [productsToBeDisplayed, setProductsToBeDisplayed] = useState(products)

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSales());
  }, [dispatch]);

  useEffect(() => {
    products && setProductsToBeDisplayed(products)
  }, [products])

  useEffect(() => {
    if(itemToBeSearch) setProductsToBeDisplayed(products.filter((e) => e.name.toLowerCase().includes(itemToBeSearch.toLowerCase())));
    else setProductsToBeDisplayed(products);
  }, [itemToBeSearch, products])

  return (
    <div className="custom-container">
      <Carousal />
      <div className="m-2">
        <Row>
          {productsToBeDisplayed.map((product) => (
            <Col sm={12} md={4} lg={3} key={product.id}>
              <CardComponent product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
