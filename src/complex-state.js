const redux = require("redux");
const produce = require("immer").produce;
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const initialState = {
  name: "Phani",
  age: 23,
  address: {
    street: "xyz",
    state: "AP",
    country: "India"
  }
};

const CHANGE_STREET = "CHANGE_STREET";

const changeStreet = (street) => {
  return {
    type: CHANGE_STREET,
    payload: street
  };
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case CHANGE_STREET:
      return produce(state, (draft) => {
        draft.address.street = actions.payload;
      });

    default:
      return state;
  }
};

const store = createStore(reducer);
const action = bindActionCreators({ changeStreet }, store.dispatch);

console.log("Initial State : " + JSON.stringify(store.getState()));
action.changeStreet("abc");
console.log("Updated State : " + JSON.stringify(store.getState()));
