import React from "react";
import { Link } from "react-router";
import axios from 'axios';
import '../index.css';
import '../assets/css/artistPage.css';
import Player from './player.js';
const API_URL = 'https://api.spotify.com/v1/albums/';

var imgAr = [];
var itemsName = [];
var followersList = [];

export default class SingleAlbum extends React.Component {

	constructor(){
		super();
		// this.searchAlbum = this.searchAlbum.bind(this);
		this.state = {
			followers:"",
			tracks:[],
			artist:"",
			album_name:"",
			img:"",
			preview_url: "",
			showBar : false
		}
	}



	anaDost(i){
		console.log('dost = ' );
		console.log(this.state.topTracks[i].preview_url);

		var preview  = this.state.tracks[i].preview_url;
		this.setState({preview_url : preview});
		this.setState({img:this.state.tracks[i].img});
		this.setState({songName:this.state.tracks[i].name});
		this.setState({showBar:true});
	}

	componentWillMount(){

		let keyword = this.props.params.albumID;
		let apiRequest = API_URL + this.props.params.albumID;
		axios.get(apiRequest, {params: []}).then(response => {
			this.setState({tracks: response.data.tracks.items});
			this.setState({artist: response.data.artists[0]});
			this.setState({album_name: response.data.name});
			this.setState({img: response.data.images[1].url});

			for (var i = 0; i < response.data.tracks.items.length; i++) {
					this.setState({preview_url:response.data.tracks.items[i].preview_url});
			}

			console.log(this.state.preview_url);

		});
	}

  	render() {
	  	return (
			<div className="row">
				<div className="Album-container">
					<div className="leftSide">
						<img src={""+this.state.img}/>
						<h1 className="ablum-title">{this.state.album_name}</h1>
						<p className="artist-txt">{this.state.artist.name}</p>
						<p className="ablum-title track-title">{ this.state.tracks.length} Track</p>
						<Link to= {"singleartist/"+this.state.artist.id}>
						 <button className="button">Artist Profile</button>
						</Link>
					</div>
					<div className="right-side">
						  <table className="Tracks__Table">
							  <tbody>
										{this.state.tracks.map((track,i)=>
											<tr key={i}  onClick={this.anaDost.bind(this,i)}>
												<td className="col_duration">{i+1}.</td>
												<td className="col_name">{track.name}</td>
												<td className="col_duration">{track.duration_ms}</td>
											</tr>
										)}
								</tbody>
						  </table>
					 </div>
					 <div className="clear"></div>
				</div>
				{ this.state.showBar ? (<Player preview_url={this.state.preview_url} />) : ('')}
			</div>
	            );
	  }
}
