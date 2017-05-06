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
  		console.log("hommeeeeee" + this.props.params.albumID);

		let keyword = this.props.params.albumID;
		// params.q = keyword;
		let apiRequest = API_URL + this.props.params.albumID;
		axios.get(apiRequest, {params: []}).then(response => {
			this.setState({tracks: response.data.tracks.items});
			this.setState({artist: response.data.artists[0]});
			this.setState({album_name: response.data.name});
			this.setState({img: response.data.images[2].url});


			
		});

	
	}

  	render() {
	  	return (
	            <div>
	              <h1>ALBUM</h1>
	              <img src={""+this.state.img}/>
	              <p>{this.state.artist.name}</p>
	              <p>{this.state.artist_name}</p>
	              <p>{ this.state.tracks.length} Track</p>
					<Link to= {"singleartist/"+this.state.artist.id}> 
  					 <button>Artist Profile</button>
					</Link>
	              <table>
	              <tbody>
		              		{this.state.tracks.map((track,i)=> 
		              			<tr key={i}>
		              			<p>{i+1}. {track.name} {track.duration_ms}</p>
		              			</tr>
              				)}
	              	</tbody>
	              </table>
	            </div>

	            );
	  }
}