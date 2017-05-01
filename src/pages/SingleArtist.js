
import React from "react";
import { Link } from "react-router";

// import Footer from "../components/layout/Footer";
// import Nav from "../components/layout/Nav";
export default class Layout extends React.Component {

  render() {
    return (
            <div className="top-artists-area" >
              	{this.state.artists.map(
									(artist, i) => <li className="artist-box" key={i} onClick={()=>props.clickerListener(video)}>
													<img src={video.snippet.thumbnails.default.url} className="artist-image"></img>
													<div className="artist-name"> {artist.snippet.title}</div>
												</li>
								)
				}
              </div>



    );
  }
}