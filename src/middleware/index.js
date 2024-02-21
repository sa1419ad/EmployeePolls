import { thunk } from "redux-thunk";
import looger from "./logger";
import { applyMiddleware } from "redux";
export default applyMiddleware(thunk, looger);
