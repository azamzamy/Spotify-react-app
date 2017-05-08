import React, { Component } from 'react'
import { Link } from "react-router";
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player'
import axios from 'axios';
import '../assets/font-awesome/css/font-awesome.css';

const MULTIPLE_SOURCES = [
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4' },
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogv' },
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm' }
]

export default class Player extends Component {

    constructor(props){
         super(props);
         console.log("got a player working");
         console.log(this.props.img);
         this.state = {
             preview_url:'',
           url: null,
           playing: false,
           volume: 0.8,
           played: 0,
           loaded: 0,
           duration: 0,
           playbackRate: 1.0,
           artistName : "",
           img : "",
           songName:""

         }
    }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
    this.setState({url:this.props.preview_url})
    // this.setState({url:this.props.preview_url})

  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
    this.setState({url:this.props.preview_url})
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  setPlaybackRate = e => {
    console.log(parseFloat(e.target.value))
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onConfigSubmit = () => {
    let config
    try {
      config = JSON.parse(this.configInput.value)
    } catch (error) {
      config = {}
      console.error('Error setting config:', error)
    }
    this.setState(config)
  }

  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  render () {
    const {
      url, playing, volume,
      played, loaded, duration,
      playbackRate,
      soundcloudConfig,
      vimeoConfig,
      youtubeConfig,
      fileConfig
    } = this.state
    const SEPARATOR = ' · '

    return (
      <div className='app'>
      <div className="player__bar">

        <div className="player__bar__left">
            <div>
                <img className="player__bar__img" src = {""+this.props.img}/>
            </div>
            <div className="bar__text">
                <h6 className="bar-name">{this.props.songName}</h6>
                <h6 className="bar-artist">{this.props.artistName}</h6>
            </div>
        </div>

        <div className="player__bar__seek">
            <a className="player__controls__button">
                {
                    !this.state.playing ?
                        <i className="fa fa-play fa-2x" aria-hidden="true" onClick={() => this.playPause()}></i>

                        :

                        <i className="fa fa-pause fa-2x" aria-hidden="true" onClick={() => this.playPause()}></i>
                }
            </a>
            <input className="bar__seeker"
              type='range' min={0} max={1} step='any'
              value={played}
              onMouseDown={this.onSeekMouseDown}
              onChange={this.onSeekChange}
              onMouseUp={this.onSeekMouseUp}
            />
        </div>
        <div className="clear"></div>
      </div>
        <section className='section'>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={player => { this.player = player }}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              playing={playing}
              playbackRate={playbackRate}
              volume={volume}
              soundcloudConfig={soundcloudConfig}
              vimeoConfig={vimeoConfig}
              youtubeConfig={youtubeConfig}
              fileConfig={fileConfig}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={() => this.setState({ playing: true })}
              onPause={() => this.setState({ playing: false })}
              onBuffer={() => console.log('onBuffer')}
              onEnded={() => this.setState({ playing: false })}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={duration => this.setState({ duration })}
            />
          </div>
        </section>
      </div>
    )
  }
}
