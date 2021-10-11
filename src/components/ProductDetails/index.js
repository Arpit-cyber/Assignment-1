import React, { useEffect } from 'react'
import { Col, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { fetchProducts } from '../../services'
import { products$ } from '../../store';
import { AddButton } from '../common/AddButton';
import { BuyButton } from '../common/BuyButton';
import { CustomRating } from '../common/Rating';
import './productDetails.css';

export const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const products = useSelector(products$)
    const selectedProduct = products.find((item) => item.id === id);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
    
    return (
        <div className="mh-5">
            <Row className="main-container">
                <Col sm={12} md={6} lg={4} className="d-flex justify-content-center">
                    <div className="image-container">
                        <Image src={selectedProduct?.avatar} alt={selectedProduct?.name} className="image"  />
                    </div>
                </Col>
                <Col sm={12} md={6} lg={4}>
                    <h4 className="mb-10">{selectedProduct?.name}</h4>
                    <p className="description mb-10">{selectedProduct?.category}</p>
                    <CustomRating rating={selectedProduct?.rating} readonly={true} classes="mb-10" />
                    <h5 className="mb-10">₹ {selectedProduct?.price}</h5>
                    <p className="description mb-10">{selectedProduct?.description}</p> 
                    <div className="d-flex flex-row justify-content-between mt-40">
                        <AddButton
                            // onClick={handleAddCart} 
                            isDisabled={selectedProduct?.count === 5} 
                        />
                        <BuyButton />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
