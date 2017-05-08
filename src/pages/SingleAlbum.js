import React from "react";
import { Link } from "react-router";
import axios from 'axios';
import '../index.css';
import '../assets/css/artistPage.css';
import Player from './player.js';
import ListItem from './ListItem';

const API_URL = 'https://api.spotify.com/v1/albums/';

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
			items:[],
			artist:"",
			album_name:"",
			img:"",
			preview_url: "",
			showBar:false,
			songName:'',
			selectedItem: -2
		}
	}

	startPlayer(){
		this.setState({showBar:true});
	}

    anaDost(i){
        this.setState({preview_url : this.state.tracks[i].preview_url});
        console.log('el3b');
        this.setState({selectedItem:i});
		this.setState({songName:this.state.tracks[i].name});
		console.log("===============");
		console.log(this.state.songName);
		console.log("===============");
    }

	componentWillMount(){

		let items = [];
		let keyword = this.props.params.albumID;
		let apiRequest = API_URL + this.props.params.albumID;
		axios.get(apiRequest, {params: []}).then(response => {
			this.setState({tracks: response.data.tracks.items});
			this.setState({artist: response.data.artists[0]});
			this.setState({album_name: response.data.name});
			this.setState({img: response.data.images[1].url});
			for (var i = 0; i < response.data.tracks.items.length; i++) {
					this.setState({preview_url:response.data.tracks.items[i].preview_url});
					items.push({
						url:response.data.tracks.items[i].preview_url,
						songName:response.data.tracks.items[i].name
					});
					this.setState({items : items});
			}
			console.log("=======================");
			console.log(this.state.artist);
			console.log("=======================");
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
                                {this.state.tracks.map(function(track,i) {
                                  var is_selected = this.state.selectedItem == i;
                                  return(
                                    <ListItem keyNum= {i} key={i} onClick={this.anaDost.bind(this,i)} isSelected = {is_selected} trackName={track.name}
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
			       <Player preview_url={this.state.preview_url} artistName = {this.state.artist.name} img={this.state.img} songName={this.state.songName}/>
			      ) : (
			       ''
			    )}
			</div>


	            );
	  }
}
