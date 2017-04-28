import React from "react";
import { Link } from "react-router";

// import Footer from "../components/layout/Footer";
// import Nav from "../components/layout/Nav";

export default class Home extends React.Component {
  render() {
  	return (
            <div>
              <h1>Spotify App Yow HOME</h1>
              {this.props.children}
              <Link to="Artists"> Artists </Link>
              <Link to="Albums"> Albums </Link>
            </div>

        );
  }
}