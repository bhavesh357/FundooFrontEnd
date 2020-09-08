import React from 'react';
import { IconButton, Typography } from '@material-ui/core';

import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

class LableModalTab extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item : props.item,
            isHovered: false,
        }
    }

    handleMouseEnter = () => {
      this.setState({
        isHovered: true,
      });
    }
    handleMouseLeave = () => {
      this.setState({
        isHovered: false,
      });
    }

    handleDelete = () => {
      this.props.handleDelete(this.state.item.id);
    }

    render(){
        return(
            <div className="modal-inputs" onMouseOver={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            <IconButton className="modal-icon" onClick={ this.state.isHovered ? this.handleDelete : undefined } >
              {!this.state.isHovered ? this.state.item.icon : <DeleteForeverOutlinedIcon /> }
            </IconButton>
            <div className="modal-label">
              <Typography >{this.state.item.name}</Typography>
            </div>
            <IconButton className="modal-icon">
              <CreateOutlinedIcon />
            </IconButton>
          </div>
        );
    }
}

export default LableModalTab;