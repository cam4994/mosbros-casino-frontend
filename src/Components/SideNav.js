import React from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';

/* This defines the actual bar going down the screen */
const StyledSideNav = styled.div`
  position: fixed;     
  height: 100%;
  width: 75px;     /* Set the width of the sidebar */
  z-index: 1;      
  top: 3.4em;      
  background-color: black; 
  overflow-x: hidden;     /* Disable horizontal scroll */
  padding-top: 10px;
`;

export default class SideNav extends React.Component {

    state = {
        activePath: this.props.pathname,
        items: [
            {
                path: '/', /* path is used as id to check which NavItem is active basically */
                name: 'Home',
                css: 'fa fa-fw fa-home',
                key: 1
            },
            {
                path: '/about',
                name: 'About',
                css: 'fas fa-info-circle',
                key: 2
            },
              {
                path: '/game',
                name: 'Start Game',
                css: 'fas fa-play-circle',
                key: 3
              },
        ]
    }

    clickHandler = (path) => {
        this.setState({ activePath: path }); /* Sets activePath which causes rerender which causes CSS to change */
    }
    render() {
        return (
            <StyledSideNav>
                {
                    this.state.items.map((item) => {
                        return (
                            <NavItem path={item.path} name ={item.name} css={item.css} clickHandler={this.clickHandler} active={item.path === this.state.activePath} key={item.key} />
                        )
                    })
                }
            </StyledSideNav>
        );
    }
}
