import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import usersReducer from "./reducers/users";
import chatReducer from "./reducers/chat"
// import { reducer as formReducer } from "redux-form"

const reducers = combineReducers({
    users : usersReducer,
    chats : chatReducer 
    // form : formReducer
});

const middleware = applyMiddleware(thunk, logger)
const store = createStore(reducers, middleware)

export default store
