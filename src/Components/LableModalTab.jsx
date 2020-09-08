import React from "react";
import { IconButton, Typography, TextField } from "@material-ui/core";

import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DoneIcon from "@material-ui/icons/Done";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

class LableModalTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: props.item.name,
      item: props.item,
      isHovered: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({
      isHovered: true,
    });
  };
  handleMouseLeave = () => {
    this.setState({
      isHovered: false,
    });
  };

  handleDelete = () => {
    this.props.handleDelete(this.state.item.id);
  };

  handleEdit = () => {
    if (this.props.isEditing) {
      if (this.state.editText !== "") {
        let newItem = this.state.item;
        newItem.name = this.state.editText;
        this.props.handleEditLabel(newItem);
      }
    } else {
      this.props.disableEdit(this.state.item.name);
    }
  };

  handleEditingText = (e) => {
    this.setState({
      editText: e.target.value,
    });
  };

  render() {
    return (
      <div
        className="modal-inputs"
        onMouseOver={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <IconButton
          className="modal-icon"
          onClick={this.state.isHovered ? this.handleDelete : undefined}
        >
          {this.state.isHovered || this.props.isEditing ? (
            <DeleteOutlineIcon />
          ) : (
            this.state.item.icon
          )}
        </IconButton>
        {this.props.isEditing ? (
          <TextField
            onChange={this.handleEditingText}
            value={this.state.editText}
            label="Edit label"
            className="modal-input"
          />
        ) : (
          <div className="modal-label">
            <Typography>{this.state.item.name}</Typography>
          </div>
        )}
        <IconButton className="modal-icon" onClick={this.handleEdit}>
          {this.props.isEditing ? <DoneIcon /> : <CreateOutlinedIcon />}
        </IconButton>
      </div>
    );
  }
}

export default LableModalTab;
