
import React from "react";

export const SnackbarContext = React.createContext();

export const SnackbarProvider = (props) => {
  const [snackbarStatus, setSnackbarStatus] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("hello");

  return (
      <SnackbarContext.Provider value={{
          snackbarStatus:snackbarStatus,
          setSnackbarStatus: setSnackbarStatus,
          snackbarMessage:snackbarMessage,
          setSnackbarMessage:setSnackbarMessage}} >
          {props.children}
      </SnackbarContext.Provider> 
  );
};
