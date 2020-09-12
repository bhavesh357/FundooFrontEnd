import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputBase,
  TextField,
  Typography,
} from "@material-ui/core";

import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

import sideMenuCalls from "../Service/sideMenu";
const SideMenuCalls = new sideMenuCalls();

export default class LabelPopper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedA: false,
      labels: [],
    };
    this.getData();
  }

  handleChange = (e) => {
    let state = e.target.name;
    let value = e.target.checked;
    console.log(state, value);
    this.setState({
      checkedA: !this.state[e.target.name],
    });
  };

  getData = () => {
    SideMenuCalls.getAllLabels(localStorage.getItem("token"), (response) => {
      if (response.data.data.details !== undefined) {
        const newLabels = response.data.data.details;
        console.log(newLabels);
        this.setState({
          labels: newLabels,
        });
      } else {
        console.log(response);
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
              checked={this.state["checked" + item.label]}
              onChange={this.handleChange}
              name={"checked" + item.label}
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
        <div className="label-popover-search">
          <TextField label="Search" focused/>
          <SearchIcon className="label-popover-button" />
        </div>
        <div className="label-popover-list">{allLabels}</div>
      </div>
    );
  }
}
