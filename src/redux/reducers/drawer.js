const initialState = {
  drawerOpen: false,
  tempDrawerOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        drawerOpen: true,
      };
    case "CLOSE":
      return {
        ...state,
        drawerOpen: false,
      };
    case "TEMP_OPEN":
      return {
        ...state,
        tempDrawerOpen: true,
      };
    case "TEMP_CLOSE":
      return {
        ...state,
        tempDrawerOpen: false,
      };
    default:
      return state;
  }
}
