import React, { Component } from "react";
import {
  NavDropdown,
  Navbar,
  Form,
  Nav,
  Button,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";

export default class NavBar extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        className="mb-1"
      >
        <Navbar.Brand href="#home">E-Cart</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="d-flex">
            <InputGroup>
              <Form.Control type="search" placeholder="Search" />
              <Button
                variant="light"
                id="search-button"
                className="search-button"
              >
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>
          <Nav className="ml-auto">
            <NavDropdown title="Arpit" id="nav-dropdown">
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#fav">
              <FaHeart />
            </Nav.Link>
            <Nav.Link href="#cart">
              <FaShoppingCart color="#0762f5" />
              <Badge pill className="cart-count">
                0
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
