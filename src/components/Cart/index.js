import React from "react";
import { Row, Col, Button, Card, Image, ButtonGroup } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { setSelectedModal } from "../../store";
import Skeleton from "react-loading-skeleton";
import { MODALS } from "../../constants";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";

export const CartComponent = ({
  isCartLoading,
  productsInCart,
  handleDecrement,
  handleIncrement,
  handleMarkAndRemoveFavorite,
  handleRemoveFromCart,
  getTotalAmount,
}) => {
  const dispatch = useDispatch();

  const RenderProductDetails = () =>
    productsInCart.map((item, i) => (
      <>
        <Row className="mb-3" key={item.id}>
          <Col>
            <Image src={item.avatar} alt={item.name} className="cart-image" />
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
    ));

  const RenderPriceDetails = () => (
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
          onClick={() => dispatch(setSelectedModal(MODALS.PLACE_ORDER))}
        >
          Place Order
        </Button>
      </div>
    </>
  );

  return (
    <div className="mh-5 ">
      <Row className="justify-content-center centered-cart">
        <Col sm={12} md={5} className="mb-2">
          {isCartLoading ? (
            <Skeleton height={468} />
          ) : (
            <Card>
              <Card.Body className="cart-card-body">
                <p>My Cart ({productsInCart?.length})</p>
                <hr />
                {productsInCart?.length > 0 ? (
                  <RenderProductDetails />
                ) : (
                  <p>Please add Item to Cart</p>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col sm={12} md={4} className="mb-2">
          {isCartLoading ? (
            <Skeleton height={400} />
          ) : (
            <Card>
              <Card.Body className="price-card-body">
                <p>Price Detail</p>
                <hr />
                {productsInCart?.length > 0 ? (
                  <RenderPriceDetails />
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
          )}
        </Col>
      </Row>
    </div>
  );
};
