import { combineReducers } from "redux";
import drawer from "./drawer";
import originalItems from "./originalItems";

export default combineReducers({
  drawer,
  originalItems,
});
