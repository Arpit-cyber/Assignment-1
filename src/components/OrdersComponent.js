import React, { Fragment, useEffect, useState } from 'react'
import { Accordion, Card, Col, Row, Image, Form } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../infra';
import { orders$ } from '../selectors';

const OrdersComponent = () => {
    const dispatch = useDispatch();
    const orders = useSelector(orders$);
    const [filteredOrders, setFilteredOrders] = useState(orders);

    useEffect(() => {
        if (orders.length) setFilteredOrders(orders);
        else dispatch(fetchOrders());
    }, [dispatch, orders])

    const handleCallback = (start, end) => {
        setFilteredOrders((prev) => prev.filter((order) => order.orderAt > new Date(start).toISOString() && order.orderAt < new Date(end).toISOString()))
    }
    console.log(filteredOrders)
    return (
        <div className="order-container">
            <div className="filter-container">
                <h5>Filter by Date : </h5>
                <div className="date-picker-input">
                    <DateRangePicker initialSettings={{ startDate: new Date('1999'), endDate: new Date() }} onCallback={handleCallback}>
                        <Form.Control type="text" />
                    </DateRangePicker>
                </div>
            </div>
            <Accordion>
                {filteredOrders?.map((order) => {
                    return (
                        <Accordion.Item eventKey={order.id} key={order.id}>
                            <Accordion.Header className="orders-toggle-button">{`${order.orderName} ${order.id}`}</Accordion.Header>
                            <Accordion.Body>
                                <h5 className="orders-card-heading">Items :</h5>
                                <Card>
                                    <Card.Body>
                                        {
                                            order.orderItems?.map((item, i) => (
                                                <Fragment key={item.id}>
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
                                                            <p className="info">Price: Rs. {item.price}</p>
                                                            <p>{item.description}</p>
                                                        </Col>
                                                    </Row>
                                                    {order.orderItems.length - 1 !== i && <hr />}
                                                </Fragment>
                                            ))
                                        }
                                    </Card.Body>
                                </Card>
                                <div className="orders-price-container">
                                    <p>Price: </p>
                                    <p className="info">Rs. {order.totalAmount}</p>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </div>
    )
}

export { OrdersComponent };
