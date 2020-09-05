import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import keepIcon from "./../Assets/keep.png";
import userImage from "./../Assets/user.jpg";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import ClearIcon from "@material-ui/icons/Clear";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { IconButton, Toolbar, Typography, InputBase } from "@material-ui/core";

const drawerWidth = 240;

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
    marginRight: 0,
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
}));

export default function MiniAppBar(props) {
  const classes = useStyles();

  return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar,"app-bar")}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.menuOpen }
            edge="start"
            className={clsx(classes.menuButton,props.drawerOpen ? "menu-icon-button": "")}
          >
            <MenuIcon className="menu-icon" />
          </IconButton>
          <div className="header-logo">
            <img src={keepIcon} alt="logo" className="keep-icon" />
            <Typography className="header-title">Notes</Typography>
          </div>
          <div className="header-search">
            <IconButton className="floating-icon" >
              <SearchIcon className="search" />
            </IconButton>
            <InputBase
              placeholder="Search…"
              className="header-input-root header-input-input"
              inputProps={{ "aria-label": "search" }}
            />

            <IconButton className="floating-icon" >
              <ClearIcon className="clear" />
            </IconButton>
          </div>
          <div className="top-menu">
            <IconButton>
              <RefreshIcon className="header-icon refresh" />
            </IconButton>
            <IconButton>
              <ViewStreamIcon className="header-icon list" />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon className="header-icon setting" />
            </IconButton>
          </div>
          <div className="user-details">
            <img src={userImage} className="user-photo" alt="Your-Dp" />
          </div>
        </Toolbar>
      </AppBar>
  );
}
