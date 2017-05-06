
import React from "react";
import { Link } from "react-router";
import  "../index.css";

// import Footer from "../components/layout/Footer";
// import Nav from "../components/layout/Nav";
export default class SingleArtist extends React.Component {
 constructor(props){
      super(props);

    }
  render() {
    if(this.props.art != null){
      var artists = this.props.art;
      var name = this.props.name;
      var url = this.props.url;
      var items = this.props.items;
      console.log("==================================");
      console.log(name);
      console.log(url);
    }
   
    
    return (
            <div >  	
            <h2>Artist</h2>
            <ul>
                <li> 
                  <Link to="albums"> 
                   <img src= {url}/> 
                  </Link>
                  <h6 className= "artist-image">{name}</h6>
                </li>
            </ul>
            </div>
            );
  }
}

