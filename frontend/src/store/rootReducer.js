import { combineReducers } from "redux";
import assetsReducer from "./assetsReducer/assetsReducer";

const rootReducer = combineReducers({
  assets: assetsReducer,
  reit: assetsReducer,
  auto: assetsReducer,
  user: assetsReducer,
  dataModal: assetsReducer,
  reitUpdate: assetsReducer,
  autoUpdate: assetsReducer,
  sellModal: assetsReducer,
  updateReit: assetsReducer,
  updateAuto: assetsReducer,
});

export default rootReducer;
