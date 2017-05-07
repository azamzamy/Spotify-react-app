import React from "react";
import { Link } from "react-router";
import axios from 'axios';

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
			img:""
		}
	}
	componentWillMount(){

		let keyword = this.props.params.albumID;
		let apiRequest = API_URL + this.props.params.albumID;
		axios.get(apiRequest, {params: []}).then(response => {
			this.setState({tracks: response.data.tracks.items});
			this.setState({artist: response.data.artists[0]});
			this.setState({album_name: response.data.name});
			this.setState({img: response.data.images[1].url});
		});


	}

  	render() {
	  	return (
	            <div>
	              	<div className="leftSide">
		              	<img src={""+this.state.img}/>
		              	<h1 className="ablum-title">{this.state.album_name}</h1>
		              	<p className="artist-txt">{this.state.artist.name}</p>
		              	<p className="ablum-title track-title">{ this.state.tracks.length} Track</p>
					  	<Link to= {"singleartist/"+this.state.artist.id}>
						<span>
	  						<button className="button">Artist Profile</button>
						</span>
						</Link>
					</div>
					<div className="right-side">
			              <table>
			              <tbody>
				              		{this.state.tracks.map((track,i)=>
				              			<tr className="row" key={i}>
					              			<td >{i+1}.</td>
					              			<td className="col_name">{track.name}</td>
					              			<td className="col_duration">{track.duration_ms}</td>
				              			</tr>
		              				)}
			              	</tbody>
			              </table>
			         </div>
	            </div>

	            );
	  }
}
