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
import {
  IconButton,
  Toolbar,
  Typography,
  InputBase,
  Popper,
  Button,
  Tooltip,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import calls from "../Service/calls";
let Calls = new calls();

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
  const history = useHistory();

  const [profileAnchorEl, setProfileAnchorEl] = React.useState(undefined);

  const handleClickProfile = (event) => {
    setProfileAnchorEl(profileAnchorEl ? null : event.currentTarget);
  };

  const handleSignOut = () => {
    Calls.signOut(localStorage.getItem("token"), (response) => {
      let message;
      if (response.data === undefined) {
        message = response.response.data.error.message;
        this.setState({
          snackbarMessage: message,
          snackbarStatus: true,
        });
      } else {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        history.push("/");
      }
    });
  };

  const open = Boolean(profileAnchorEl);
  const profileId = open ? "simple-popper" : undefined;

  const handleSearchFocus = () => {
    history.push("/dashboard/search");
  };

  return (
    <AppBar
      aria-describedby={profileId}
      position="fixed"
      className={clsx(classes.appBar, "app-bar")}
    >
      <Toolbar>
        <Tooltip title="Menu">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.menuOpen}
            edge="start"
            className={clsx(
              classes.menuButton,
              props.drawerOpen ? "menu-icon-button" : ""
            )}
          >
            <MenuIcon className="menu-icon" />
          </IconButton>
        </Tooltip>
        <div className="header-logo">
          <img src={keepIcon} alt="logo" className="keep-icon" />
          <Typography className="header-title">
            {props.title.charAt(0).toUpperCase() + props.title.slice(1)}
          </Typography>
        </div>
        <div
          className={
            props.searchFocus ? "header-search floated" : "header-search"
          }
        >
          <IconButton className="floating-icon">
            <SearchIcon className="search" />
          </IconButton>
          <InputBase
            id="search-input"
            placeholder="Search…"
            onFocus={handleSearchFocus}
            className="header-input-root header-input-input"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            className={
              props.searchFocus
                ? "floating-icon"
                : "floating-icon icon-invisible"
            }
            id="search-clear-button"
          >
            <ClearIcon className="clear" />
          </IconButton>
        </div>
        <div className="top-menu">
          <Tooltip title="Change View">
            <IconButton>
              <ViewStreamIcon className="header-icon list" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="user-details">
          <div>
          <Tooltip title="Profile" placement="left">
            <img
              src={userImage}
              onClick={handleClickProfile}
              className="user-photo"
              alt="Your-Dp"
            />
            </Tooltip>
            <Popper
              id={profileId}
              open={open}
              anchorEl={profileAnchorEl}
              placement="bottom"
            >
              <div className="profile-popper">
                <Button
                  onClick={handleSignOut}
                  color="primary"
                  variant="outlined"
                >
                  Sign Out
                </Button>
              </div>
            </Popper>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
