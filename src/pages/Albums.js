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
var albumsId=[];
export default class Albums extends React.Component {

	constructor(){
		super();
		this.searchAlbum = this.searchAlbum.bind(this);
		this.state = {
			items: [],
			imgArray:[],
			itemsName:[],
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
		try{
		axios.get(API_URL, {params: params}).then(response => {
			this.setState({items: response.data.albums.items});
			for (var i = 0; i <20; i++) {

				var imgURL = this.state.items[i].images.length;
				if(imgURL > 2){
					imgAr.push(this.state.items[i].images[1].url);
					itemsName.push(this.state.items[i].name);
					albumsId.push(this.state.items[i].id);
				} 

			}
			this.setState({imgArray:imgAr});
			this.setState({itemsName:itemsName});

		});
		}
		catch(e){
			console.log("ASASASASAS" + e);
		}
	}
  	render() {

  		

	  	return (
	            <div className="body-container">
	              <h1 className="no-margin">Search For Albums</h1>
	              <form onSubmit={this.searchAlbum}>
	              <input ref="album_txt" placeholder="Search for Albums" className="searcher"/>
	              </form>
	              {this.state.imgArray.map((img,i)=> 
	              		<li key={i} className="music-item">
	              			<Link to= {"singlealbum/"+albumsId[i]}> 
	              			<span>
	              				<img src={""+img} className="music-image"/>
	              				<p className="music-title">{this.state.itemsName[i]}</p>
	              			</span>
	              			</Link>
	              		</li>
              	)}
	            </div>

	            );
	  }
}