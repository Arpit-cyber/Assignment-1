import { combineReducers } from "redux";
import { DashboardSlice } from "./Dashboard/reducer";
import { LoaderSlice } from "./Loader/reducer";

const rootReducer = combineReducers({
  [DashboardSlice.name]: DashboardSlice.reducer,
  [LoaderSlice.name]: LoaderSlice.reducer,
});

export default rootReducer;
