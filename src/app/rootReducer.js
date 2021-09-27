import { combineReducers } from "redux";
import { DashboardSlice } from "../reducers/Dashboard.slice";

const rootReducer = combineReducers({
  [DashboardSlice.name]: DashboardSlice.reducer,
});

export default rootReducer;
