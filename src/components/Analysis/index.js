import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orders$, products$, viewedProducts$ } from '../../store';
import { fetchOrders, fetchProducts, fetchViewedProducts } from '../../services';
import { BarChart, PieChart } from '../Charts';

export const AnalysisComponent = () => {
    const dispatch = useDispatch();
    const orders = useSelector(orders$);
    const products = useSelector(products$);
    const viewedProducts = useSelector(viewedProducts$);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchOrders());
        dispatch(fetchViewedProducts());
    }, [dispatch]);

    const getDataForPieChart = () => {
        const countObj = products.map((e) => e.name).reduce((a, v) => ({ ...a, [v]: 0}), {})

        const orderItemsIn2DFormat = orders.map(e => e.orderItems);
        const orderItemsIn1DFormat = [].concat.apply([], orderItemsIn2DFormat);

        orderItemsIn1DFormat.forEach(e => countObj[e.name]++)

        return Object.entries(countObj)
    }

    const getDataForBarChart = () => {
        const countObj = products.map((e) => e.name).reduce((a, v) => ({ ...a, [v]: 0}), {})

        viewedProducts.forEach(e => countObj[e.name]++)

        return Object.entries(countObj)
    }

    const dataForPieChart =[
        ['Products', 'Total Sale'],
        ...getDataForPieChart()
    ];

    const dataForBarChart = [
        ['Products', 'Views'],
        ...getDataForBarChart()
    ]

    return (
        <div className="mh-5">
            <h5 className="centered-heading">Analysis Report</h5>
            <div className="chart-container">
                <BarChart data={dataForBarChart} title="Most Viewed Product" horizontalAxisTitle="Views" verticalAxisTitle="Products" />
                <PieChart data={dataForPieChart} title="Most Ordered Product" />
            </div>
        </div>
    )
}
