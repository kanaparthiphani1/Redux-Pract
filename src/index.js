const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const ORDERED_CAKE = "ORDERED_CAKE";
const REFILL_CAKE = "REFILL_CAKE";
const ORDERED_ICECREAM = "ORDERED_ICECREAM";
const REFILL_ICECREAM = "REFILL_ICECREAM";

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

const orderIceCream = (n) => {
  return {
    type: ORDERED_ICECREAM,
    payload: n
  };
};

const refillIceCream = (n) => {
  return {
    type: REFILL_ICECREAM,
    payload: n
  };
};

const initialCakeState = {
  numberOfCakes: 10
};

const initialIceCreamState = {
  numberOfIceCream: 12
};

const cakeReducer = (prevState = initialCakeState, action) => {
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

const iceCreamReducer = (prevState = initialIceCreamState, action) => {
  switch (action.type) {
    case ORDERED_ICECREAM:
      return {
        ...prevState,
        numberOfIceCream: prevState.numberOfIceCream - action.payload
      };
    case REFILL_ICECREAM:
      return {
        ...prevState,
        numberOfIceCream: prevState.numberOfIceCream + action.payload
      };
    default:
      return prevState;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});
const store = createStore(rootReducer);
const actions = bindActionCreators(
  { orderCake, refillCake, orderIceCream, refillIceCream },
  store.dispatch
);

console.log("Initial : " + JSON.stringify(store.getState()));

store.subscribe(() => {
  console.log("Updated : " + JSON.stringify(store.getState()));
});

actions.orderCake(2);
actions.orderCake(3);
actions.orderIceCream(4);
actions.refillIceCream(2);

actions.refillCake(7);
