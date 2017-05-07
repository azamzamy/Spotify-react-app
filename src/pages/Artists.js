import React from "react";
import { Link } from "react-router";
import axios from 'axios';
import '../index.css';
// import Footer from "../components/layout/Footer";
// import Nav from "../components/layout/Nav";
const API_URL = 'https://api.spotify.com/v1/search';
let params = {
    q: '',
	type: 'artist',
	maxResults: 20
};
var imgAr = [];
var itemsName = [];
var artistIds = [];
export default class Artists extends React.Component {


	constructor(props){
		super(props);
		this.searchAlbum = this.searchAlbum.bind(this);
		this.state = {
			items: [],
			imgArray:[],
			itemsName : [],
            artistIds : []
		}


	}
	searchAlbum (event){
		event.preventDefault();
		imgAr = [];
		itemsName = [];
        artistIds = [];
		let artist_name = this.refs.artist_txt.value;
		let keyword = artist_name;
		params.q = keyword;
		axios.get(API_URL, {params: params}).then(response => {
			this.setState({items: response.data.artists.items});
			console.log(response.data.artists);

			for (var i = 0; i <20; i++) {

                artistIds.push(response.data.artists.items[i].id);
				var imgURL = this.state.items[i].images.length;
				if(imgURL > 2){
					imgAr.push(this.state.items[i].images[1].url);
					itemsName.push(this.state.items[i].name)

				}

			}
			this.setState({imgArray:imgAr});
			this.setState({itemsName:itemsName});
            this.setState({artistIds:artistIds});
            console.log("Response fetched");
		});
		// console.log("ON CLICK ########");
		// console.log("ON CLICK ########" + this.state.imgArray);
		// console.log("ON CLICK ########" + this.state.itemsName);
	}
  render() {

  	  	return (
	            <div className="body-container">
	              <h1 className="no-margin">Search For Artists</h1>
	              <form onSubmit={this.searchAlbum}>
	              <input className="searcher" ref="artist_txt" placeholder="Search for Artists"/>
	              </form>
	              {this.state.imgArray.map((img,i)=>
	              		<li key={i} className="music-item">
	              			<Link to={"singleartist/" + this.state.artistIds[i]}>
                                <span>
    	              				<img src={""+img} className="music-image"/>
    	              				<p className="music-title">{this.state.itemsName[i]}</p>
    	              			</span>
	              			</Link>
	              			<p>{this.state.itemsName[i]}</p>
	              		</li>
              	)}
	            </div>

	            );
  }
}
