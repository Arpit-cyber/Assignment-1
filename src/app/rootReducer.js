import { combineReducers } from "redux";
import { DashboardSlice } from "../reducers/Dashboard.slice";
import { LoaderSlice } from "../reducers/Loader.slice";

const rootReducer = combineReducers({
  [DashboardSlice.name]: DashboardSlice.reducer,
  [LoaderSlice.name]: LoaderSlice.reducer,
});

export default rootReducer;
