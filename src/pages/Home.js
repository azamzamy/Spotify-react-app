import React from "react";
import { Link } from "react-router";
import axios from 'axios';
import SingleArtist from './SingleArtist.js';

// import Footer from "../components/layout/Footer";
// import Nav from "../components/layout/Nav";

const API_URL = 'https://api.spotify.com/v1/search';

let params = {
    q: '',
	type: 'artist',
	maxResults: 20
};
export default class Home extends React.Component {
  	constructor(props) {
		super(props);
		// this.load = this.load.bind(this)
		this.state = {
			artists: [{}],
			items: [],
			name: "",
			url :""
		}
		  		console.log("CONSTRUCTOR");
	}
  	
  	componentWillMount(){
  		console.log("hommeeeeee");

		let keyword = "lil wayne";
		params.q = keyword;
		axios.get(API_URL, {params: params}).then(response => {

			this.setState({artists: response.data.artists});
			this.setState({items: response.data.artists.items});
			this.setState({name: response.data.artists.items[0].name});
			this.setState({url: response.data.artists.items[0].images[2].url});
			console.log("@@@@@@@@@@@@@@");
			console.log("response")
			console.log(this.state.artists);
			// console.log(this.state.artists.items[0].name);
			// console.log("###" + response.data.artists.items[0].name);
			console.log("@@@@@@@@@@@@@@");
		});
	}

  	render() {
  		console.log("home render");
  		return (
            <div>
              <h1>Top Artists</h1>
              <SingleArtist art= {this.state.artists} items={this.state.items} name={this.state.name} url={this.state.url}></SingleArtist>
            </div>

        );
  }
}