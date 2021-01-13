import { combineReducers } from "redux";
import {user} from "./Userreducer";


const Reducer = combineReducers({
    userState: user 
})




export default Reducer