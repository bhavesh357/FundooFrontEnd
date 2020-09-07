import React from 'react';
import { IconButton, Typography } from '@material-ui/core';

import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";

class LableModalTab extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item : props.item,
        }
    }

    render(){
        return(
            <div className="modal-inputs">
            <IconButton className="modal-icon">
              {this.state.item.icon}
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