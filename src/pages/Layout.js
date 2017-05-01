import React from "react";
import { Link } from "react-router";

// import Footer from "../components/layout/Footer";
// import Nav from "../components/layout/Nav";
export default class Layout extends React.Component {

  render() {
    return (
            <div>
            <div className="navigator">
              <img src="https://spot-music-app.herokuapp.com/static/media/logo.1c7de6e7.png" alt="spotify" className="spotify-logo"/>
              <ul className="nav-buttons">
                <li><Link to="home"> Home </Link></li>
                <li><Link to="albums"> Albums </Link></li>
                <li><Link to="artists"> Artists </Link></li>               
              </ul>
              
              <a className="user">
              <i className="fa fa-user-o padding--right" aria-hidden="true"></i>
              John Cena
              </a>
            </div>
              {this.props.children}
              
            </div>
    );
  }
}