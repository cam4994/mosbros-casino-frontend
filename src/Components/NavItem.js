import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from 'styled-components';

const NavIcon = styled.div`
font-size: 12px;
`;

const StyledNavItem = styled.div`
  height: 70px;
  width: 75px; /* width must be same size as NavBar to center */
  text-align: center; /* Aligns <a> inside of NavIcon div */
  margin-bottom: 0;   /* Puts space between NavItems */
  a {
    font-size: 2.7em;
    color: ${(props) => props.active ? "white" : "#f20e12"};
    :hover {
      opacity: 0.7;
      text-decoration: none; /* Gets rid of underlining of icons */
    }  
  }
`;

export default class NavItem extends React.Component {
    handleClick = () => {
        this.props.clickHandler(this.props.path);
    }

    render() {
        const { active } = this.props;
        return (
            <StyledNavItem active={active}>
                <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
                    <NavIcon>{this.props.name}</NavIcon>
                </Link>
            </StyledNavItem>
        );
    }
}