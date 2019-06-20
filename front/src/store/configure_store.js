import rootReducer from "../reducers/index";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";

const logger = createLogger({
  collapsed: true
});

export default () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );
};
