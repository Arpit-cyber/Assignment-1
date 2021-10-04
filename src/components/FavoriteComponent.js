import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavoriteProducts } from '../infra';
import { favoriteProducts$ } from '../selectors'
import CardComponent from './CardComponents';

export default function FavoriteComponent() {
    const dispatch = useDispatch();
    const favoriteProducts = useSelector(favoriteProducts$);

    useEffect(() => {
        dispatch(fetchFavoriteProducts())
    }, dispatch)

    return (
        <div className="m-2">
            <h4 className="m-2">Wish List</h4>
            <Row>
            {favoriteProducts.map((product) => (
                <Col sm={12} md={4} lg={3} key={product.id}>
                    <CardComponent product={product} />
                </Col>
            ))}
            </Row>
        </div>
    )
}
