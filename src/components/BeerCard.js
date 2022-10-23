import React from "react";
import "./BeerCard.css";
import loupe from "../assets/loupe.png";
import { useBeer } from "../contexts/BeerContext";
import { useNavigate } from "react-router-dom";

function BeerCard({ beer }) {
  const { incrementQuantityOrdered, decrementQuantityOrdered } = useBeer();

  // used to manage the deactivation of the remove button
  const beerIsInCart = beer.quantityOrdered > 0;

  const navigate = useNavigate();

  return (
    <div className="card-container">
      <h2>{beer.name}</h2>
      <div className="main-content">
        <div className="left-card">
          <img src={beer.image_url} alt="" />
          <span>
            Volume : {beer.volume.value} {beer.volume.unit}
          </span>
        </div>
        <div className="right-card">
          <p>{beer.description.slice(0, 60)}...</p>

          <button
            className="details-btn"
            // send beer id to display details
            onClick={() => navigate("/details", { state: { id: beer.id } })}
          >
            See details
          </button>
          <div className="cart-div">
            {beer.quantityOrdered > 0 && (
              <span>Cart : {beer.quantityOrdered}</span>
            )}
            <button
              disabled={!beerIsInCart}
              onClick={() => decrementQuantityOrdered(beer.id)}
            >
              -
            </button>
            <button onClick={() => incrementQuantityOrdered(beer.id)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeerCard;
