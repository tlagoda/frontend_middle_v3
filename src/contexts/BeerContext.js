import React, { useContext, useReducer } from "react";
import { BeerReducer } from "../reducers/BeerReducer";

const BeerContext = React.createContext();

export function useBeer() {
  return useContext(BeerContext);
}
const initialState = {};

const API_URL = "https://api.punkapi.com/v2/beers?page=";
const BEERS_PER_PAGE = 25;

export function BeerProvider({ children }) {
  const [beers, dispatch] = useReducer(BeerReducer, initialState);

  const loadBeers = (page) => {
    // Caching
    if (
      beers.hasOwnProperty(page * BEERS_PER_PAGE + 1) ||
      beers.hasOwnProperty(page * BEERS_PER_PAGE - 1)
    ) {
      return null;
    } else {
      // Loading of unloaded beers
      console.log("fetching data");
      fetch(API_URL + page)
        .then((res) => res.json())
        .then((data) => dispatch({ type: "ADD_LOADED_BEERS", payload: data }));
    }
  };

  const incrementQuantityOrdered = (id) => {
    dispatch({ type: "INCREMENT_QUANTITY_ORDERED", payload: id });
  };

  const decrementQuantityOrdered = (id) => {
    if (beers[id].quantityOrdered > 0) {
      dispatch({ type: "DECREMENT_QUANTITY_ORDERED", payload: id });
    }
  };

  const value = {
    beers,
    loadBeers,
    incrementQuantityOrdered,
    decrementQuantityOrdered,
  };

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
}
