import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addToCart,
  fetchCart,
  markAndRemoveFavorite,
  updateProductInCart,
  viewedProduct,
} from "../../services";
import { setAlert, productsInCart$, products$, updateProducts } from "../../store";
import { AddButton } from "../common/AddButton";
import { BuyButton } from "../common/BuyButton";
import { CustomRating } from "../common/Rating";

export const CardComponent = ({ product }) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(productsInCart$);
  const products = useSelector(products$);
  const history = useHistory();

  const productDetailsInCart = productsInCart?.find((e) => e.name === product.name);

  const handleAddCart = () => {
    const isProductAlreadyInCart = productsInCart?.some(
      (item) => item.name === product.name
    );

    if (isProductAlreadyInCart) {
      const data = {
        id: productDetailsInCart.id,
        product: {
          ...productDetailsInCart,
          count: productDetailsInCart.count + 1,
        },
      };
      dispatch(updateProductInCart(data)).then(() => dispatch(fetchCart()));
    } else {
      const updatedProduct = { ...product, count: 1 };
      const productDetails = {
        createdAt: product.createdAt,
        name: product.name,
        avatar: product.avatar,
        description: product.description,
        price: product.price,
        rating: product.rating,
        category: product.category,
      };
      dispatch(viewedProduct(productDetails));
      dispatch(addToCart(updatedProduct)).then(() => {
        dispatch(fetchCart());
      });
    }

    dispatch(setAlert("Item added to cart!"));
  };

  const handleMarkAndRemoveFavorite = (product) => {
    dispatch(markAndRemoveFavorite({ id: product.id, product }))
    dispatch(updateProducts(products.map((e) => e.id === product.id ? product : e)))
  }

  return (
    <Card className="custom-card" key={product.id}>
      <Card.Img
        variant="top"
        src={product.avatar}
        width="80px"
        height="300px"
        onClick={() => history.push(`/products/${product.id}`)}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="truncate">{product.name}</Card.Title>
        <div className="fav-container">
          {product?.isFav ? (
            <FaHeart
              className="fav-icon"
              onClick={() =>
                handleMarkAndRemoveFavorite({ ...product, isFav: false })
              }
            />
          ) : (
            <FaRegHeart
              className="fav-icon"
              onClick={() =>
                handleMarkAndRemoveFavorite({ ...product, isFav: true })
              }
            />
          )}
        </div>
        <div className="star-container">
          <Card.Text className="f-12">Price: ₹ {product.price}</Card.Text>
          <CustomRating rating={product.rating} readonly={true} />
        </div>
        <div className="d-flex flex-row justify-content-between">
          <AddButton
            onClick={handleAddCart}
            isDisabled={productDetailsInCart?.count === 5}
          />
          <BuyButton />
        </div>
      </Card.Body>
    </Card>
  );
};
