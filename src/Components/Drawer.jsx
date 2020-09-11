import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";


import {
  IconButton,
  Typography,
  Modal,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LableModalTab from "./LableModalTab";
import { useSelector, useDispatch } from "react-redux";
import { tempClose, tempOpen } from "../redux/actions";

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

  const drawerOpen = useSelector(state => state.drawer.drawerOpen);
  const tempDrawerOpen = useSelector(state => state.drawer.tempDrawerOpen);
  const dispatch = useDispatch();

  const history = useHistory();
  const isActive = drawerOpen || tempDrawerOpen ? "opened " : "";
  const [editingLabel, setEditingLabel] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalInput, setModalInput] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  
  const handleDrawerClose = () => {
      dispatch(tempClose());
  };

  const handleDrawerOpen = () => {
    dispatch(tempOpen());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (name) => {
    history.push("/dashboard/" + name.toLowerCase() );
  };

  const handleEditLabels = () => {
    handleOpen();
  };

  const handleNewLabel = () => {
    if(modalInput!==""){
      setModalInput("");
      props.addNewLabel(modalInput);
    }
  }

  const handleDeleteLabel = (id) => {
    props.deleteLabel(id);
  }

  const handleEditLabel = (item) => {
    props.editLabel(item.id,item.name);
  }

  const disableEdit = (name) => {
    setEditingLabel(name);
  }

  let labelsComponent = props.labels.slice(2, props.labels.length - 3);
  let labels = labelsComponent.map((item) => {
    return <LableModalTab item={item} key={item.name} disableEdit={disableEdit} isEditing={editingLabel === item.name} handleDelete={handleDeleteLabel} handleEditLabel={handleEditLabel} />;
  });

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
      onMouseOver={handleDrawerOpen}
      onMouseOut={handleDrawerClose}
      className={clsx(classes.drawer, "drawer", {
        [classes.drawerOpen]: drawerOpen || tempDrawerOpen,
        [classes.drawerClose]: !drawerOpen && !tempDrawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerOpen || tempDrawerOpen,
          [classes.drawerClose]: !drawerOpen && !tempDrawerOpen,
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
          <Typography className="simple-modal-title">Edit Labels</Typography>
          <div className="modal-inputs">
            <IconButton className="modal-icon">
              <CloseIcon />
            </IconButton>
            <TextField onChange={(e) => setModalInput(e.target.value)} value={modalInput} label="Create new label" className="modal-input" />
            <IconButton onClick={handleNewLabel} className="modal-icon">
              <DoneIcon />
            </IconButton>
          </div>
          {labels}
          <Divider />
          <div className="modal-buttons">
            <Button onClick={handleClose}>Done</Button>
          </div>
        </div>
      </Modal>
      <List className="drawer-list">{listItems}</List>
    </Drawer>
  );
}
