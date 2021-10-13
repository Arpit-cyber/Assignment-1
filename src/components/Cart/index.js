import React, { useEffect } from "react";
import { Row, Col, Button, Card, Image, ButtonGroup } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import {
  productsInCart$,
  setItemToBeRemovedFromCart,
  setSelectedModal,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  fetchProducts,
  markAndRemoveFavorite,
  updateProductInCart,
} from "../../services";
import { MODALS } from "../../constants";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const CartComponent = () => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(productsInCart$);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const getTotalAmount = () =>
    productsInCart
      .reduce(
        (accumulator, current) => accumulator + current.price * current.count,
        0
      )
      .toFixed(2);

  const handleRemoveFromCart = (id) => {
    dispatch(setSelectedModal(MODALS.DELETE_CONFIRMATION));
    dispatch(setItemToBeRemovedFromCart(id));
  };

  const handleIncrement = (item) => {
    dispatch(
      updateProductInCart({
        id: item.id,
        product: {
          ...item,
          count: item?.count < 5 ? item?.count + 1 : item?.count,
        },
      })
    ).then(() => dispatch(fetchCart()));
  };

  const handleDecrement = (item) => {
    dispatch(
      updateProductInCart({
        id: item.id,
        product: {
          ...item,
          count: item?.count > 1 ? item?.count - 1 : item?.count,
        },
      })
    ).then(() => dispatch(fetchCart()));
  };

  const handleMarkAndRemoveFavorite = (product) => {
    dispatch(markAndRemoveFavorite({ id: product.id, product })).then(() =>
      dispatch(fetchProducts())
    );
    dispatch(
      updateProductInCart({
        id: product.id,
        product,
      })
    ).then(() => dispatch(fetchCart()));
  }

  return (
    <div className="mh-5 ">
      <Row className="justify-content-center centered-cart">
        <Col sm={12} md={5} className="mb-2">
          <Card>
            <Card.Body className="cart-card-body">
              <p>My Cart ({productsInCart?.length})</p>
              <hr />
              {productsInCart?.length > 0 ? (
                <>
                  {productsInCart.map((item, i) => (
                    <>
                      <Row className="mb-3" key={item.id}>
                        <Col>
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            className="cart-image"
                          />
                        </Col>
                        <Col className="d-flex justify-content-between flex-column">
                          <div>
                            <p className="info m-0">{item.name}</p>
                            <p className="info">{item.description}</p>
                          </div>
                          <div className="cart-buttons">
                            <Button
                              variant="light"
                              className="delete-product-icon"
                              onClickCapture={() => handleRemoveFromCart(item.id)}
                            >
                              <MdDeleteForever />
                            </Button>
                            <div className="ml-10">
                              {item?.isFav ? (
                                <FaHeart
                                  className="fav-icon"
                                  onClick={() =>
                                    handleMarkAndRemoveFavorite({
                                      ...item,
                                      isFav: false,
                                    })
                                  }
                                />
                              ) : (
                                <FaRegHeart
                                  className="fav-icon"
                                  onClick={() =>
                                    handleMarkAndRemoveFavorite({
                                      ...item,
                                      isFav: true,
                                    })
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </Col>
                        <Col xm={12} md={4} lg={3} className="custom-column">
                          <ButtonGroup className="custom-button-group">
                            <Button
                              variant="light"
                              className="product-counter"
                              onClick={() => handleDecrement(item)}
                            >
                              -
                            </Button>
                            <Button
                              variant="light"
                              className="product-counter product-counter-text"
                            >
                              {item.count}
                            </Button>
                            <Button
                              variant="light"
                              className="product-counter"
                              onClick={() => handleIncrement(item)}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                          <p className="info">$ {item.price}</p>
                        </Col>
                      </Row>
                      {productsInCart?.length - 1 !== i && <hr />}
                    </>
                  ))}
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
              {productsInCart?.length > 0 ? (
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
                  <div className="d-flex justify-content-center align-items-center">
                    <p>Total Amount $: {getTotalAmount()}</p>
                    <Button
                      className="order-button border-0"
                      variant="danger"
                      onClick={() =>
                        dispatch(setSelectedModal(MODALS.PLACE_ORDER))
                      }
                    >
                      Place Order
                    </Button>
                  </div>
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
      </Row>
    </div>
  );
};
