import {
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

import ClearIcon from "@material-ui/icons/Clear";
import React from "react";

import sideMenuCalls from "../Service/sideMenu";
const SideMenuCalls = new sideMenuCalls();

export default class LabelPopper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
    };
    if(this.props.labels.length > 0){
      this.loadStates();
    }
    this.getData();
  }

  loadStates = () =>{
    for(let i=0;i<this.props.labels.length;i++){
      this.setState({
        ...this.state,
        [this.props.labels[i].label]: true,
      });
    }
  }

  handleChange = (e,id,label) => {
    let state = e.target.name;
    this.setState({
      [state]: !this.state[e.target.name],
    });
    if(this.state[e.target.name]){
      this.props.removeLabel(id,label);
    }else{
      this.props.addLabel(id,label);
    }
  };

  getData = () => {
    SideMenuCalls.getAllLabels(localStorage.getItem("token"), (response) => {
      if (response.data.data.details !== undefined) {
        const newLabels = response.data.data.details;
        this.setState({
          labels: newLabels,
        });
      } else {
      }
    });
  };

  render() {
    let allLabels = this.state.labels.map((item) => {
      return (
        <FormControlLabel
          key={item.label}
          control={
            <Checkbox
              checked={this.state[item.label]}
              onChange={(e) => this.handleChange(e,item.id,item.label)}
              name={item.label}
              color="primary"
            />
          }
          label={item.label}
        />
      );
    });
    return (
      <div className="popover label-popover">
        <div className="label-popover-header">
          <Typography>Labels</Typography>
          <ClearIcon className="label-popover-button" onClick={this.props.close} />
        </div>
        {/* <div className="label-popover-search">
          <TextField label="Search" focused/>
          <SearchIcon className="label-popover-button" />
        </div> */}
        <div className="label-popover-list">{allLabels}</div>
      </div>
    );
  }
}
