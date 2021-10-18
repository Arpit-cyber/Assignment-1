import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { ProductDetails } from '../../components/ProductDetails';
import { fetchProducts } from '../../services'
import { products$ } from '../../store';

export const ProductDetailsContainer = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const products = useSelector(products$)
    const selectedProduct = products.find((item) => item.id === id);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
    
    return (
        <ProductDetails selectedProduct={selectedProduct} />
    )
}
