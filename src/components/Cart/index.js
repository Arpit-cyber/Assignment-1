import React, { useEffect } from "react";
import { Row, Col, Button, Card, Image, Form } from "react-bootstrap";
import {
  productsInCart$,
  setItemToBeRemovedFromCart,
  setSelectedModal,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateProductInCart } from "../../services";
import { MODALS } from '../../constants'

export const CartComponent = () => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(productsInCart$);

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const getTotalAmount = () =>
    productsInCart
      .reduce(
        (accumulator, current) =>
          accumulator + (current.price * current.count),
        0
      )
      .toFixed(2);

  const handleRemoveFromCart = (id) => {
    dispatch(setSelectedModal(MODALS.DELETE_CONFIRMATION))
    dispatch(setItemToBeRemovedFromCart(id))
  }

  return (
      <Row className="d-flex flex-row pt-40 mh-5">
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
                            src={item.avatar}
                            alt={item.name}
                            className="cart-image"
                          />
                        </Col>
                        <Col>
                          <p className="info">{item.name}</p>
                          <p className="info">Price: $ {item.price}</p>
                        </Col>
                        <Col>
                          <Form.Control
                            type="number"
                            key={item.id}
                            min={1}
                            max={5}
                            className="width-60"
                            value={item.count}
                            onChange={(e) =>
                              dispatch(updateProductInCart({
                                id: item.id,
                                product: { ...item, count: parseInt(e.target.value) }
                              })).then(() => dispatch(fetchCart()))
                            }
                          />
                        </Col>
                        <Col>
                          <Button
                            variant="light"
                            className="delete-button"
                            onClickCapture={() => handleRemoveFromCart(item.id)}
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
                    onClick={() => dispatch(setSelectedModal(MODALS.PLACE_ORDER))}
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
                            {item.name} x {item.count}
                          </p>
                        </Col>
                        <Col sm={12} md={5}>
                          <p>$: {item.count * item.price}</p>
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
  );
};
