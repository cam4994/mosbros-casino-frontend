import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    position: fixed;
    width: 100vw;
  }
  .navbar { background-color: black; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #f20e12;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.5em;
    color: #f20e12;
    &:hover { color: white; }
  }
`;

 const NavBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Mos Bros Casino</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link as={Link} to="/signup"> Sign Up</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link as={Link} to="/login">Log In</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)

export default NavBar