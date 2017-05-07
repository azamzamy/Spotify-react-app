import React from "react";
import { Link } from "react-router";
import axios from 'axios';
import SingleArtist from './SingleArtist.js';
import Player from './player.js';
// import Footer from "../components/layout/Footer";
// import Nav from "../components/layout/Nav";

const API_URL = 'https://api.spotify.com/v1/search';
var imgAr = [];
var itemsName = [];
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
			url :"",
			images : [],
            artistID : []
		}
		  		console.log("CONSTRUCTOR");
	}

  	componentWillMount(){
  		console.log("hommeeeeee");

        var ids = [];
		let keyword = "q";
		params.q = keyword;
		axios.get(API_URL, {params: params}).then(response => {

			this.setState({artists: response.data.artists});
			this.setState({items: response.data.artists.items});
			this.setState({name: response.data.artists.items[0].name});
			this.setState({url: response.data.artists.items[0].images[2].url});
			console.log("@@@@@@@@@@@@@@");
			console.log("response")
			console.log(this.state.artists);
			console.log("@@@@@@@@@@@@@@");

			for (var i = 0; i <20; i++) {

				var imgURL = this.state.items[i].images.length;
				if(imgURL > 1){
					imgAr.push(this.state.items[i].images[0].url);
					itemsName.push(this.state.items[i].name);
                    ids.push(response.data.artists.items[i].id);
					console.log("#######!       " + i);
					console.log(this.state.items[i].images[2].url);
				}

			}
            this.setState({artistID : ids});
		});

	}

  	render() {
  		console.log("home render");
  		return (
            <div className="body-container">
              <h1>Top Artists</h1>
              	{imgAr.map((img,i)=>
	              		<li className="music-item" key={i}>
	              			<Link to={"singleartist/" + this.state.artistID[i]}>
                                <span>
    	              				<img src={""+img} className="music-image"/>
    	              			     <p className="music-title" >{itemsName[i]}</p>
    	              			</span>
	              			</Link>
	              		</li>
              	)}
                <Player/>
            </div>

        );
  }
}
