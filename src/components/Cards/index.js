import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Image } from "react-bootstrap";
import { FaShoppingCart, FaShoppingBag, FaHeart, FaRegHeart } from "react-icons/fa";
import { addToCart, fetchCart, fetchFavoriteProducts, markFavorite, removeFavorite, viewedProduct } from "../../services";
import Rating from "react-rating";
import { Icons } from "../../resources";
import { favoriteProducts$, setAlert } from "../../store";

export const CardComponent = ({ product }) => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(favoriteProducts$);

  const handleAddCart = (product) => {
    dispatch(viewedProduct(product))
    dispatch(addToCart(product)).then(() => {
      dispatch(fetchCart());
      dispatch(setAlert("Item added to cart!"));
    })
  }

  const isFavorite = useMemo(() => favoriteProducts.some((item) => item.id === product.id), [favoriteProducts, product]);

  const handleMarkFavorite = () => dispatch(markFavorite(product)).then(() => dispatch(fetchFavoriteProducts()))
  
  const handleRemoveFavorite = () => dispatch(removeFavorite(product.id)).then(() => dispatch(fetchFavoriteProducts()))

  return (
    <Card className="custom-card" key={product.id}>
      <Card.Img variant="top" src={product.avatar} width="80px" height="300px" />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div className="star-container">
          <Card.Title className="truncate">{product.name}</Card.Title>
          {
            isFavorite 
              ? <FaHeart className="fav-icon" onClick={handleRemoveFavorite} />
              : <FaRegHeart className="fav-icon" onClick={handleMarkFavorite} />
          }
        </div>
        <div className="star-container">
          <Card.Text className="f-12">Price: ₹ {product.price}</Card.Text>
          <Rating 
            stop={5}
            fractions={2}
            initialRating={product.rating} 
            emptySymbol={<Image src={Icons.starLight} alt="star-light" className="star" />}
            fullSymbol={<Image src={Icons.starFill} alt="star-fill" className="star" />}
            readonly 
          />
        </div>
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
