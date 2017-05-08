import React from "react";
import { Link } from "react-router";
import axios from 'axios';
import Player from './player.js';
import '../index.css';
import '../assets/css/artistPage.css';
import ListItem from './ListItem';

var API_URL = 'https://api.spotify.com/v1/artists/';
let params = {
    country : ''
};
var style = {
  backgroundImage: ''
};

export default class SingleArtist extends React.Component {



 constructor(props){
      super(props);
      this.state = {
          topTracks: [],
          artistAlbums: [],
          artistID: "",
          coverPhoto: "",
          artistName: "",
          artistFollowers: "",
          preview_url: "",
          artistName : "",
          img : "",
          songName:"",
          showBar:false,
          selectedItem: -2
      }
    }


    startPlayer(){
    this.setState({showBar:true});
  }
    anaDost(i){
        console.log('Chose a track....');
        this.setState()
        console.log(this.state.topTracks[i].preview_url);
        var preview  = this.state.topTracks[i].preview_url;
        this.setState({preview_url : preview});
        this.setState({img:this.state.topTracks[i].img});
        this.setState({songName:this.state.topTracks[i].name});
        this.setState({selectedItem: i});
    }


    componentDidMount() {
        this.getTopTracks();
        this.getAlbums();
        this.getArtistDetails();
    }


    getArtistDetails() {
        // https://api.spotify.com/v1/artists/{id}
        let API_REQUEST = API_URL + this.props.params.artistID;
        axios.get(API_REQUEST, {params: ""}).then(response => {
            console.log("got artist details response...");
            this.setState({artistFollowers : response.data.followers.total});
            this.setState({coverPhoto : response.data.images[0].url});
            this.setState({artistName : response.data.name});
            console.log(this.state.artistFollowers);
            console.log(this.state.coverPhoto);
            console.log(this.state.artistName);
            style.backgroundImage =  'url(' +  this.state.coverPhoto  + ')';
            console.log(style);
    });
    }

    getAlbums() {
        var albums = [];
        let API_REQUEST = API_URL + this.props.params.artistID + "/albums";
        axios.get(API_REQUEST, {params: params}).then(response => {
            console.log("got albums response...");
            for( var i = 0; i<response.data.items.length; i++) {

                albums.push({
                    albumID: response.data.items[i].id ,
                    albumName: response.data.items[i].name,
                    albumArt: response.data.items[i].images[1].url
                });
            }
            this.setState({artistAlbums : albums});

    });
    }

    getTopTracks(){
        var tracks = [];
    params.country = "SE";
        let API_REQUEST = API_URL + this.props.params.artistID + "/top-tracks";

    axios.get(API_REQUEST, {params: params}).then(response => {
            console.log("got Top tracks response...");
            console.log(response.data.tracks[0].name);
            console.log(response.data.tracks[0].duration_ms);

            for( var i = 0; i<response.data.tracks.length; i++) {

                tracks.push({
                    name: response.data.tracks[i].name ,
                    duration_ms: response.data.tracks[i].duration_ms,
                    preview_url: response.data.tracks[i].preview_url,
                    img:response.data.tracks[i].album.images[0].url
                });
            }
            this.setState({topTracks:tracks});
    });

  }

  render() {

        if(this.props.art != null){
          var artists = this.props.art;
          var name = this.props.name;
          var url = this.props.url;
          var items = this.props.items;
          console.log("==================================");
          console.log("Artist page");
          console.log(name);
          console.log(url);
        }


    return (
            <div className="artist__section" onClick={this.startPlayer.bind(this)}>
                <div className="artist__section__image" style={style}>
                    <div className="section">
                        <p> {this.state.artistFollowers} Followers </p>
                        <h2 className="artist__section__title">{this.state.artistName}</h2>
                        <a className="button_section button_section_hover">Follow</a>
                        <a className="button_section_play button_section">Play All</a>
                    </div>
                </div>
                <h2 className="top_tracks_title">Top Tracks</h2>
                  <div className="topTracks">
                        <table className="Tracks__Table">
                            <tbody>
                                {this.state.topTracks.map(function(track,i) {
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
                <h2 className="top_tracks_title">Albums</h2>
                <ul>
                    {this.state.artistAlbums.map((album,i)=>
                        <li className="music-item" key={i}>
                            <Link to={"singlealbum/" + album.albumID}>
                                <span>
                                    <img src={album.albumArt} className="music-image"/>
                                    <p className="artist-image" >{album.albumName}</p>
                                </span>
                            </Link>
                        </li>
                    )}
                </ul>
                {this.state.showBar ? (
                   <Player preview_url={this.state.preview_url}  artistName = {this.state.artistName} img={this.state.img} songName={this.state.songName}
                   />
                  ) : (
                   ''
                )}
            </div>
            );
  }
}
