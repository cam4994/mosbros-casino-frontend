import React from 'react';
import SideNav from './SideNav'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

const RouterSideNav = withRouter(SideNav);
export default class Sidebar extends React.Component {
  render() {
    return (
        <RouterSideNav/>
    );
  }
}

