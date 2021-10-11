import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaginationFilters,
  itemToBeSearch$,
  products$,
  isProductLoading$,
  paginationFilters$,
  setFilters,
  filters$
} from "../../store";
import { Carousal } from "../Carousal";
import { CardComponent } from "../Cards";
import {
  fetchCart,
  fetchFavoriteProducts,
  fetchProducts,
  fetchSales,
} from "../../services";
import { CustomDropdown } from "../Dropdown";
import { Icons } from "../../resources";
import Skeleton from "react-loading-skeleton";

const MOCK_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];

const MOCK_FILTERS = [
  { label: "Laptop", value: "laptop" },
  { label: "Earphones", value: "earphones" },
];

export const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector(products$);
  const paginationFilters = useSelector(paginationFilters$);
  const isProductLoading = useSelector(isProductLoading$);
  const itemToBeSearch = useSelector(itemToBeSearch$);
  const [productsToBeDisplayed, setProductsToBeDisplayed] = useState(products);
  const filters = useSelector(filters$)

  useEffect(() => {
    dispatch(fetchProducts(paginationFilters));
    dispatch(fetchSales());
    dispatch(fetchCart());
    dispatch(fetchFavoriteProducts());
  }, [dispatch, paginationFilters]);

  const pageCounts = useMemo(() => {
    const maxPages = Math.ceil(21 / 8);
    return Array.from({ length: maxPages }, (_, i) => i + 1);
  }, []);

  useEffect(() => {
    products && setProductsToBeDisplayed(products);
  }, [products]);

  useEffect(() => {
    if (itemToBeSearch)
      setProductsToBeDisplayed(
        products.filter((e) =>
          e.name.toLowerCase().includes(itemToBeSearch.toLowerCase())
        )
      );
    else if (filters.length > 0)
      setProductsToBeDisplayed(
        products.filter((e) =>
          filters.some((filter) => filter.value.includes(e.category))
        )
      );
    else setProductsToBeDisplayed(products);
  }, [itemToBeSearch, products, filters]);

  const RenderColumns = () => {
    return productsToBeDisplayed.length > 0 ? (
      productsToBeDisplayed.map((product) => (
        <Col sm={12} md={4} lg={3} key={product.id}>
          <CardComponent product={product} />
        </Col>
      ))
    ) : (
      <div className="no-found-image">
        <Image src={Icons.noResult} alt="No Result Found" />
      </div>
    );
  };

  const RenderCardSkeleton = () => {
    return MOCK_ARRAY.map((e) => (
      <Col sm={12} md={4} lg={3} key={e}>
        <Card className="skeleton-custom-card" key="s1">
          <Skeleton height="300px" />
          <Card.Body className="d-flex flex-column justify-content-between">
            <Skeleton height={38} />
            <Skeleton height={38} />
            <Skeleton height={38} />
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <div className="mh-5">
      {isProductLoading ? (
        <Skeleton height={320} className="mb-20" />
      ) : (
        <Carousal />
      )}
      {isProductLoading ? (
        <Skeleton height={38} />
      ) : (
        <CustomDropdown
          options={MOCK_FILTERS}
          placeholder="Filter By Category"
          value={filters}
          onChange={(selectedOptions) => dispatch(setFilters(selectedOptions))}
        />
      )}
      <div className="m-2">
        <Row>
          {isProductLoading ? <RenderCardSkeleton /> : <RenderColumns />}
        </Row>
      </div>
      {productsToBeDisplayed?.length > 0 && (
        <div className="pagination-container">
          {pageCounts.map((e) => (
            <div
              key={e}
              className={classnames("pagination-item", {
                "pagination-item-active": paginationFilters.page === e,
              })
            }
              onClick={() => {
                dispatch(setPaginationFilters({ page: e, limit: 8 }));
                dispatch(fetchProducts({ page: e, limit: 8 }));
              }}
            >
              <span>{e}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
