import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';

import './index.css';
import './App.css';
import '../public/font-awesome/css/font-awesome.css';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";
import SingleArtist from "./pages/SingleArtist";
import SingleAlbum from "./pages/SingleAlbum";

class App extends React.Component{

  render(){
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Home}> </IndexRoute>
            <Route path="albums" component={Albums}></Route>
            <Route path="artists" component={Artists}></Route>
            <Route path="home" component={Home}></Route>
            <Route path="singleartist/:artistID" component={SingleArtist}></Route>
            <Route path="singlealbum/:albumID" component={SingleAlbum}></Route>
          </Route>
        </Router>
        {this.props.children}
      </div>
    )

}
}

ReactDOM.render(<App></App>, document.getElementById('root'));
