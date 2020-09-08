import React from "react";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

const originalItems = [
  {
    name: "Notes",
    icon: <EmojiObjectsOutlinedIcon />,
  },
  {
    name: "Reminders",
    icon: <NotificationsNoneOutlinedIcon />,
  },
  {
    name: "Edit Labels",
    icon: <CreateOutlinedIcon />,
  },
  {
    name: "Archive",
    icon: <ArchiveOutlinedIcon />,
  },
  {
    name: "Trash",
    icon: <DeleteOutlineIcon />,
  },
];


const initialState = {
    originalItems: originalItems,
}
export default function(state = initialState, action) {
    return state;
  }