import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer as user } from "./user";
import { creditsReducer as credits } from "./credits";
import { debitsReducer as debits } from "./debits";
import { totalsReducer as total } from "./total";

const reducer = combineReducers({ user, credits, debits, total });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./credits";
export * from "./debits";
export * from "./total";
