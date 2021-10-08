import { combineReducers } from "redux";
import { DashboardSlice } from "./Dashboard";
import { LoaderSlice } from "./Loader";
import { ModalSlice } from "./Model";

const rootReducer = combineReducers({
  [DashboardSlice.name]: DashboardSlice.reducer,
  [LoaderSlice.name]: LoaderSlice.reducer,
  [ModalSlice.name]: ModalSlice.reducer,
});

export default rootReducer;
