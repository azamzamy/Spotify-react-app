import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import '../assets/font-awesome/css/font-awesome.css';

export default class ListItem extends React.Component{

    
 constructor(props){
      super(props);
      this.state = {
          hover_flag: false
      }
    }

    hoverEvent() {
        this.setState({hover_flag: !this.state.hover_flag});
    }

    render(){
        var liStyle = {
            color: 'white'
        };
        if (this.props.isSelected || this.state.hover_flag) {
            liStyle['color'] = '#219042';
        }
        console.log("KEEYYEYEYEYY" + this.props.keyNum);
        return (
            <tr onClick={this.props.onClick}>
                <td style={liStyle} className="col_duration">{this.props.keyNum}.</td>
                <td style={liStyle} className="col_name">{this.props.trackName}</td>
                <td style={liStyle} className="col_duration">{this.props.duration}</td>
            </tr>
        );
    }
}

ListItem.propTypes = {
        onClick: React.PropTypes.func.isRequired,
        isSelected: React.PropTypes.bool
    };
