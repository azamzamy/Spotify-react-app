import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';

import './index.css';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";


class App extends React.Component{

  render(){
    return (
      <div>
      <h1> asdfg </h1>
        <Router history={hashHistory}>
          <Route path="/" component={Home}>
            <IndexRoute component={Layout}> </IndexRoute>
            <Route path="albums" component={Albums}></Route>
            <Route path="artists" component={Artists}></Route>
          </Route>
        </Router>

      </div>
    )

}
}

ReactDOM.render(<App></App>, document.getElementById('root'));


