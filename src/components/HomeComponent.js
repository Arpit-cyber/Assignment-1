import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import classnames from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { itemToBeSearch$, products$, isProductLoading$, filters$ } from "../selectors";
import Carousal from "../widgets/Carousal";
import CardComponent from "./CardComponents";
import { fetchCart, fetchFavoriteProducts, fetchOrders, fetchProducts, fetchSales } from "../infra";
import HomeComponentSkeleton from "../skeletons/HomeComponentSkeleton";
import { CustomDropdown } from "../widgets/CustomDropdown";
import { Icons } from '../assets'
import { setPaginationFilters } from "../reducers";

const MOCK_FILTERS = [
  { label: "Laptop", value: "laptop" },
  { label: "Earphones", value: "earphones" },
]

export default function HomeComponent() {
  const dispatch = useDispatch();
  const products = useSelector(products$);
  const paginationFilters = useSelector(filters$);
  const isProductLoading = useSelector(isProductLoading$);
  const itemToBeSearch = useSelector(itemToBeSearch$)
  const [productsToBeDisplayed, setProductsToBeDisplayed] = useState(products);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts(paginationFilters));
    dispatch(fetchSales());
    dispatch(fetchCart());
    dispatch(fetchOrders());
    dispatch(fetchFavoriteProducts());
  }, [dispatch, paginationFilters]);

  const pageCounts = useMemo(() => {
    const maxPages = Math.ceil(21 / 8);
    return Array.from({length: maxPages}, (_, i) => i + 1)
  }, [])

  useEffect(() => {
    products && setProductsToBeDisplayed(products)
  }, [products])

  useEffect(() => {
    if(itemToBeSearch) setProductsToBeDisplayed(products.filter((e) => e.name.toLowerCase().includes(itemToBeSearch.toLowerCase())));
    else if(filters.length > 0) setProductsToBeDisplayed(products.filter((e) => filters.some((filter) => filter.value.includes(e.category))));
    else setProductsToBeDisplayed(products);
  }, [itemToBeSearch, products, filters])

  return (
      isProductLoading ? <HomeComponentSkeleton /> : 
        <>
          <Carousal />
          <CustomDropdown 
            options={MOCK_FILTERS} 
            placeholder="Filter By Category"
            value={filters}
            onChange={(selectedOptions) => setFilters(selectedOptions)} 
          />
          <div className="m-2">
            <Row>
              {productsToBeDisplayed.length > 0 
                ? productsToBeDisplayed.map((product) => (
                    <Col sm={12} md={4} lg={3} key={product.id}>
                      <CardComponent product={product} />
                    </Col>
                  ))
                : <div className="no-found-image">
                  <Image src={Icons.noResult} alt="No Result Found" />
                </div>}
            </Row>
          </div>
          {productsToBeDisplayed.length > 0 && <div className="pagination-container">
            {
              pageCounts.map((e) => (
                <div 
                  className={classnames("pagination-item", { 'pagination-item-active': paginationFilters.page === e })}
                  onClick={() => {
                    dispatch(setPaginationFilters({ page: e, limit: 8 }))
                    dispatch(fetchProducts({ page: e, limit: 8 }))
                  }}
                >
                  <span>{e}</span>
                </div>
              ))
            }
          </div>}
        </>
  );
}
