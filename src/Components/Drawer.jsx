import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import CreateIcon from '@material-ui/icons/Create';
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import {
  IconButton,
  Typography,
  Modal,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate( -50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));


export default function MiniDrawer(props) {
  const classes = useStyles();
  const isActive = props.drawerOpen || props.tempDrawerOpen ? "opened " : "";

  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (name) => {
    history.push("/dashboard/" + name);
  };

  const handleEditLabels = () => {
    handleOpen();
  };

  let listItems = props.labels.map((item) => {
    return (
      <div
        onClick={() => {
          if (item.name !== "Edit Labels") {
            handleClick("" + item.name);
          } else {
            handleEditLabels();
          }
        }}
        className={
          item.name !== "Notes"
            ? isActive + "list-item"
            : isActive + "list-item active"
        }
        key={item.name}
      >
        <IconButton className="list-icon">{item.icon}</IconButton>
        <Typography className="list-item-text">{item.name}</Typography>
      </div>
    );
  });

  return (
    <Drawer
      variant="permanent"
      onMouseOver={props.menuOpen}
      onMouseOut={props.menuClose}
      className={clsx(classes.drawer, "drawer", {
        [classes.drawerOpen]: props.drawerOpen || props.tempDrawerOpen,
        [classes.drawerClose]: !props.drawerOpen && !props.tempDrawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.drawerOpen || props.tempDrawerOpen,
          [classes.drawerClose]: !props.drawerOpen && !props.tempDrawerOpen,
        }),
      }}
    >
      <Divider />
      <Modal
        open={open}
        onClose={handleClose}
        className="modal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper + " modal-body"}>
          <Typography class="simple-modal-title">Edit Labels</Typography>
          <div className="modal-inputs">
            <IconButton className="modal-icon">
              <CloseIcon />
            </IconButton>
            <TextField label="Create new label" className="modal-input" />
            <IconButton className="modal-icon">
              <DoneIcon />
            </IconButton>
          </div>
          
          <Divider />
          <div className="modal-buttons">
              <Button onClick={handleClose} >Done</Button>
          </div>
        </div>
      </Modal>
      <List className="drawer-list">{listItems}</List>
    </Drawer>
  );
}
