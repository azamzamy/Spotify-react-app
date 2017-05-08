import React from "react";
import { Link } from "react-router";
import axios from 'axios';
import '../index.css';
import '../assets/css/artistPage.css';
import Player from './player.js';
const API_URL = 'https://api.spotify.com/v1/albums/';
import ListItem from './ListItem.js';

var imgAr = [];
var itemsName = [];
var followersList = [];
var items =[];

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
      		selectedItem: -2,
			showBar:false
		}
	}

	startPlayer(){
		this.setState({showBar:true});
	}
	
    anaDost(i){

        var preview  = items[i].url;
        this.setState({preview_url : preview});
        console.log('el3b');
        this.setState({selectedItem: i});
        console.log("WHATUUP: ");
        console.log(this.state.tracks[i]);
        this.setState({img:this.state.tracks[i].img});

        // this.setState({img:this.state.topTracks[i].img});
        // this.setState({:items[i].songName})
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
					items.push({url:response.data.tracks.items[i].preview_url});
			}

			console.log(this.state.preview_url);

		});


	}

  	render() {
	  	return (
			<div className="row" onClick={this.startPlayer.bind(this)}>
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
								{this.state.tracks.map(function (track,i) {
                                  var is_selected = this.state.selectedItem == i;
                                  return(
                                    <ListItem key={i} keyNum={i} onClick={this.anaDost.bind(this,i)} 
                                    isSelected={is_selected} trackName={track.name} 
                                    duration={track.duration_ms}>
                                    </ListItem>
                                    );
                                }.bind(this)
										)}
								</tbody>
						  </table>
					 </div>
					 <div className="clear"></div>
				</div>

				{this.state.showBar ? (
			       <Player preview_url={this.state.preview_url} />
			      ) : (
			       ''
			    )}
			</div>


	            );
	  }
}
