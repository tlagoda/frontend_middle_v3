import React from "react";
import { useBeer } from "../contexts/BeerContext";
import BeerCard from "../components/BeerCard";
import "./Cart.css";

function Cart() {
  const { beers } = useBeer();

  // handle empty cart
  if (
    !Object.keys(beers).filter((key) => beers[key].quantityOrdered > 0).length
  ) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-container">
      {Object.keys(beers)
        .filter((key) => beers[key].quantityOrdered > 0)
        .map((key) => (
          <BeerCard beer={beers[key]} />
        ))}
    </div>
  );
}

export default Cart;
