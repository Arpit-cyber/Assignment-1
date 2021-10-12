import React, { useState } from "react";
import {
  NavDropdown,
  Navbar,
  Form,
  Nav,
  Button,
  Badge,
  Image
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { paginationFilters$, productsInCart$, setFilters, setPaginationFilters, setSearchItem } from "../../store";
import { Icons } from '../../resources'
import { fetchProducts } from "../../services";
import { UserThumbnail } from "../common/UserThumbnail";

const emptyString = "";

const NavBar = () => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(productsInCart$);
  const paginationFilters = useSelector(paginationFilters$);
  const [itemToBeSearch, setItemToBeSearch] = useState(emptyString);

  const handleReset = () => {
    setItemToBeSearch(emptyString)
    dispatch(setPaginationFilters())
    dispatch(setFilters())
    dispatch(setSearchItem())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFetchProducts()
    }
  }

  const handleFetchProducts = () => {
    const filter = {
      ...paginationFilters,
      page: 1,
      name: itemToBeSearch,
      category: ""
    }

    dispatch(setPaginationFilters(filter));
    dispatch(fetchProducts(filter));
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="mb-1 bg-purple custom-navbar"
      variant="dark"
    >
      <LinkContainer to="/" onClick={handleReset}>
        <Navbar.Brand>E-Cart</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Form className="d-flex">
          <div className="nav-search-container">
            <Form.Control 
              type="search" 
              placeholder="Search" 
              className="search-input-field" 
              onChange={(e) => setItemToBeSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              value={itemToBeSearch} 
            />
            <Button
              variant="light"
              id="search-button"
              className="search-button"
              onClick={handleFetchProducts}
            >
              <FaSearch />
            </Button>
          </div>
        </Form>
        <Nav className="d-flex justify-content-center align-items-center ml-auto">
          <NavDropdown 
            title={
              <UserThumbnail user={{name: "Arpit Kumar"}} />
            } 
            id="nav-dropdown"
          >
            <LinkContainer to="/orders">
              <NavDropdown.Item>Orders</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/analysis">
              <NavDropdown.Item>Analytics Report</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="#profile">
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="#logout">
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <LinkContainer to="/favorite">
            <Nav.Link>
              <FaHeart />
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/cart">
            <Nav.Link>
              <FaShoppingCart color="#0762f5" />
              <Badge pill className="cart-count" bg="light">
                {productsInCart.length}
              </Badge>
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
