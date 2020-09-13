import {
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
    InputBase,
    TextField,
    Typography,
} from "@material-ui/core";

import ClearIcon from "@material-ui/icons/Clear";
import React from "react";

const colors=[{
    background: '#FFFFFF',
},{
    background: '#fa8072',
},{
    background: '#FF9900',
},{
    background: '#FFFF64',
},{
    background: '#66FF66',
},{
    background: '#008080',
},{
    background: '#2F5FFF',
},{
    background: '#00FFFF',
},{
    background: '#9B2C9B',
},{
    background: '#FFC0CB',
},{
    background: '#FF1A06',
},{
    background: '#808080',
}]

export default class ColorPopper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
        };
        this.style={
            background: '#ffffff',
        }
    }
    
    
    render() {

        let allColors= colors.map((item) => {
            return <Grid item md={3} className="color" key={item.background} style={item} onClick={() => this.props.addColor(item.background)} >
            
            </Grid>
        });
        return (
            <div className="popover color-popover">
            <div className="color-popover-header">
            <Typography>Colors</Typography>
            <ClearIcon className="color-popover-button" onClick={this.props.close} />
            </div>
            <Grid container className="color-popover-list">
            {allColors}
            </Grid>
            </div>
            );
        }
    }
    