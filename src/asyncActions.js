const redux = require("redux");
const reduxLogger = require("redux-logger");
const axios = require("axios");
const thunkMiddleWare = require("redux-thunk").default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const GET_USERS_REQUESTED = "GET_USERS_REQUESTED";
const GET_USERS_SUCCEDED = "GET_USERS_SUCCEDED";
const GET_USERS_FAILED = "GET_USERS_FAILED";

const getUsersRequest = () => {
  return {
    type: GET_USERS_REQUESTED
  };
};

const getUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCEDED,
    payload: users
  };
};

const getUsersFailed = (error) => {
  return {
    type: GET_USERS_FAILED,
    payload: error
  };
};

const initialState = {
  loading: false,
  users: [],
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      };

    case GET_USERS_SUCCEDED:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleWare));

const requestUsers = () => {
  return async (dispatch) => {
    dispatch(getUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        headers: { "Accept-Encoding": "gzip,deflate,compress" }
      })
      .then((res) => {
        dispatch(getUsersSuccess(res.data.map((user) => user.id)));
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        dispatch(getUsersFailed(error.message));
      });
  };
};

console.log("Initial STate : " + store.getState());

store.subscribe(() => {
  console.log("Updated state : " + JSON.stringify(store.getState()));
});

store.dispatch(requestUsers());
