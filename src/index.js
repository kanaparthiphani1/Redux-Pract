const redux = require("redux");
const createStore = redux.createStore;

const ORDERED_CAKE = "ORDERED_CAKE";
const REFILL_CAKE = "REFILL_CAKE";

const orderCake = (n) => {
  return {
    type: ORDERED_CAKE,
    payload: n
  };
};

const refillCake = (n) => {
  return {
    type: REFILL_CAKE,
    payload: n
  };
};

const initialState = {
  numberOfCakes: 10
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ORDERED_CAKE:
      return {
        ...prevState,
        numberOfCakes: prevState.numberOfCakes - action.payload
      };
    case REFILL_CAKE:
      return {
        ...prevState,
        numberOfCakes: prevState.numberOfCakes + action.payload
      };
    default:
      return prevState;
  }
};

const store = createStore(reducer);

console.log("Initial : " + store.getState().numberOfCakes);

store.subscribe(() => {
  console.log("Updated : " + store.getState().numberOfCakes);
});

store.dispatch(orderCake(2));
store.dispatch(orderCake(3));
store.dispatch(refillCake(6));
