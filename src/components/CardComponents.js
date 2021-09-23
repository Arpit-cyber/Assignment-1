import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";

export default class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => this.setState(() => ({ products: res.data })));
  }

  render() {
    const { products } = this.state;

    return (
      <Row>
        {products.map((product) => (
          <Col sm={12} md={3}>
            <Card className="custom-card" key={product.id}>
              <Card.Img
                variant="top"
                src={product.image}
                width="80px"
                height="300px"
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="f-12">Price: $ {product.price}</Card.Text>
                <div className="d-flex flex-row justify-content-between">
                  <Button variant="warning">
                    <FaShoppingCart /> Add
                  </Button>
                  <Button
                    className="bg-orange text-white border-0"
                    variant="danger"
                  >
                    <FaShoppingBag /> Buy
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}
