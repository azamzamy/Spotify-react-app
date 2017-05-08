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

    render(){
        var liStyleWhite = {
            color: 'white'
        };
        var liStyleGrey = {
            color: '#8C8C8C'
        };
        if (this.props.isSelected || this.state.hover_flag) {
            liStyleGrey['color'] = '#219042';
            liStyleWhite['color'] = '#219042';

        }
        return (
            <tr className="list-item" onClick={this.props.onClick}>
                <td  className="col_duration"><a style={liStyleGrey}>{this.props.keyNum}.</a></td>
                <td  className="col_name"><a style={liStyleWhite}>{this.props.trackName}</a></td>
                <td  className="col_duration"><a style={liStyleGrey}>{this.props.duration}</a></td>
            </tr>
        );
    }
}

ListItem.propTypes = {
        onClick: React.PropTypes.func.isRequired,
        isSelected: React.PropTypes.bool
    };
