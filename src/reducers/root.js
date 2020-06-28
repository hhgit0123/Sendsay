import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import historyReducer from "./historyReducer.js";
import consoleReducer from "./consoleReducer.js";
export default combineReducers({
  auth: authReducer,
  history: historyReducer,
  console: consoleReducer,
});
