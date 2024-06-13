import {combineReducers} from "redux" ;
import userAuthreducer from "./userAuthreducer";
import projectReducers from "./projectReducers";
import searchReducers from "./searchReducers";

const myReducer = combineReducers({
    user: userAuthreducer,
    projects: projectReducers,
    searchTerm:searchReducers,
})

export default myReducer ;