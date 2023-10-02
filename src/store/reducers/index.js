import { combineReducers } from "redux";
import invoiceReducer from "./invoiceReducers";

export default combineReducers({
  invoiceReducer: invoiceReducer,
});