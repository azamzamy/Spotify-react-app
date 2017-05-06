import React from "react";
import { Link } from "react-router";
import axios from 'axios';
// import Footer from "../components/layout/Footer";
// import Nav from "../components/layout/Nav";
const API_URL = 'https://api.spotify.com/v1/search';
let params = {
    q: '',
	type: 'album',
	maxResults: 20
};
var imgAr = [];
var itemsName = [];
export default class Albums extends React.Component {

	constructor(){
		super();
		this.searchAlbum = this.searchAlbum.bind(this);
		this.state = {
			items: [],
			imgArray:[],
			itemsName:[]
		}
	}
	searchAlbum (event){
		event.preventDefault();
		imgAr = [];
		itemsName = [];
		let album_name = this.refs.album_txt.value;
		let keyword = album_name;
		params.q = keyword;
		// params.type = type;
		axios.get(API_URL, {params: params}).then(response => {
			this.setState({items: response.data.albums.items});
			for (var i = 0; i <20; i++) {

				var imgURL = this.state.items[i].images.length;
				if(imgURL > 2){
					imgAr.push(this.state.items[i].images[2].url);
					itemsName.push(this.state.items[i].name);
				} 

			}
			this.setState({imgArray:imgAr});
			this.setState({itemsName:itemsName});
		});
	}
  	render() {

	  	return (
	            <div>
	              <h1>Spotify App ALBUMS</h1>
	              <form onSubmit={this.searchAlbum}>
	              <input ref="album_txt" placeholder="Search for Albums"/>
	              </form>
	              {this.state.imgArray.map((img,i)=> 
	              		<li key={i}>
	              			<Link to="singlealbum"> 
	              				<img src={""+img}/>
	              			</Link>
	              			<p>{this.state.itemsName[i]}</p>
	              		</li>
              	)}
	            </div>

	            );
	  }
}