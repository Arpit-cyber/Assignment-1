import React, { useEffect } from "react";
import { Row, Col, Button, Card, Image, Form } from "react-bootstrap";
import {
  productsInCart$,
  countOfItems$,
} from "../selectors/Dashboard.selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  countOfItems,
  removeCountOfItems,
  setAlert,
} from "../reducers/Dashboard.slice";

const CartComponent = () => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(productsInCart$);
  const itemsCount = useSelector(countOfItems$);

  useEffect(() => {
    if (Object.keys(itemsCount).length === 0)
      productsInCart.forEach((item) =>
        dispatch(
          countOfItems({
            [item.id]: 1,
          })
        )
      );
  }, [dispatch, itemsCount, productsInCart]);

  const getTotalAmount = () =>
    productsInCart
      .reduce(
        (accumulator, current) =>
          accumulator + current.price * itemsCount[current.id],
        0
      )
      .toFixed(2);

  return (
    <div className="custom-container">
      <Row className="d-flex flex-row pt-40">
        <Col md={2} />
        <Col sm={12} md={5} className="mb-2">
          <Card>
            <Card.Body className="cart-card-body">
              <p>My Cart ({productsInCart.length})</p>
              <hr />
              {productsInCart.length > 0 ? (
                <>
                  {productsInCart.map((item) => (
                    <>
                      <Row className="mb-3" key={item.id}>
                        <Col>
                          <Image
                            src={item.image}
                            alt={item.title}
                            className="cart-image"
                          />
                        </Col>
                        <Col>
                          <p className="info">{item.title}</p>
                          <p className="info">Price: $ {item.price}</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="number"
                            key={item.id}
                            min={1}
                            max={5}
                            defaultValue={1}
                            className="width-60"
                            value={itemsCount[item.id]}
                            onChange={(e) =>
                              dispatch(
                                countOfItems({
                                  [item.id]: parseInt(e.target.value),
                                })
                              )
                            }
                          />
                        </Col>
                        <Col>
                          <Button
                            variant="light"
                            className="delete-button"
                            onClickCapture={() => {
                              dispatch(removeCountOfItems(item.id));
                              dispatch(removeFromCart(item.id));
                            }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                      <hr />
                    </>
                  ))}
                  <Button
                    className="order-button border-0"
                    variant="danger"
                    onClick={() => {
                      dispatch(removeFromCart());
                      dispatch(setAlert("Order placed"));
                    }}
                  >
                    Place Order
                  </Button>
                </>
              ) : (
                <p>Please add Item to Cart</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4} className="mb-2">
          <Card>
            <Card.Body className="price-card-body">
              <p>Price Detail</p>
              <hr />
              {productsInCart.length > 0 ? (
                <>
                  {productsInCart.map((item) => (
                    <>
                      <Row key={item.id}>
                        <Col sm={12} md={7}>
                          <p>
                            {item.title} x {itemsCount[item.id]}
                          </p>
                        </Col>
                        <Col sm={12} md={5}>
                          <p>$: {itemsCount[item.id] * item.price}</p>
                        </Col>
                      </Row>
                      <hr />
                    </>
                  ))}
                  <p>Total Amount $: {getTotalAmount()}</p>
                </>
              ) : (
                <Row>
                  <Col sm={12} md={7}>
                    <p>Total Amount</p>
                  </Col>
                  <Col sm={12} md={5}>
                    <p>$:0</p>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={1} />
      </Row>
    </div>
  );
};

export default CartComponent;
