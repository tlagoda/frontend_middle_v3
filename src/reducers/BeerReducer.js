export const BeerReducer = (state, action) => {
  let newState = state;

  switch (action.type) {
    case "ADD_LOADED_BEERS":
      // each beer is stored at the key id
      // we add a 'quantity ordered' key to each beer
      Object.keys(action.payload).map((key) => {
        const newKey = action.payload[key].id;
        newState[newKey] = { ...action.payload[key], quantityOrdered: 0 };
      });
      break;
    case "INCREMENT_QUANTITY_ORDERED":
      // increment the quantity ordered
      newState[action.payload].quantityOrdered += 1;
      break;
    case "DECREMENT_QUANTITY_ORDERED":
      // decrement the quantity ordered
      newState[action.payload].quantityOrdered -= 1;
      break;
    default:
      throw new Error();
  }
  return {
    ...newState,
  };
};
