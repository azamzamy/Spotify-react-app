
import React from "react";
import { Link } from "react-router";
import axios from 'axios';

var API_URL = 'https://api.spotify.com/v1/artists/';
let params = {
    country : ''
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
          artistFollowers: ""
      }
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
                    duration_ms: response.data.tracks[i].duration_ms
                });
            }
            this.setState({topTracks:tracks});

		});

	}

  render() {
      console.log(this.props.params.artistID);
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
            <div >
                <h5> {this.state.artistFollowers} Followers </h5>
                <h2>{this.state.artistName}</h2>
                <img src={this.state.coverPhoto} />
                <h2>Top Tracks</h2>
                <table class="Tracks__Table">
                    <tbody>
                        {this.state.topTracks.map((track,i)=>
                            <tr key={i}>
                                <td>{i+1}.</td>
                                <td>{track.name}</td>
                                <td>{track.duration_ms}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <h2>Albums</h2>
                <ul>
                    {this.state.artistAlbums.map((album,i)=>
                        <li key={i}>
                          <Link to={"singlealbum/" + album.albumID}>
                          <span>
                            <img src= {album.albumArt}/>
                            </span>
                          </Link>
                          <h6 className= "artist-image">{album.albumName}</h6>
                        </li>
                    )}
                </ul>

            </div>
            );
  }
}
