import { combineReducers } from "redux";
import recentSearch from "./recentSearch";

const rootReducer = combineReducers({
	recentSearch,
});

export default rootReducer;
