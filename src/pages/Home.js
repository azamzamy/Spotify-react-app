import React from "react";
import { Link } from "react-router";
import axios from 'axios';

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
		this.state = {
			artists: [],
		}

	}
  	
  	componentWillMount(){
		let keyword = "lil wayne";
		params.q = keyword;

		axios.get(API_URL, {params: params}).then(response => {
			this.setState({artists: response.data.items});
			console.log(response.data);
		});
	}

  	render() {
  		return (
            <div>
              <h1>Top Artists</h1>

            </div>

        );
  }
}