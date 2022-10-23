import React from "react";
import { useLocation } from "react-router-dom";
import { useBeer } from "../contexts/BeerContext";
import "./Details.css";

function Details() {
  const { beers } = useBeer();

  // retrieve data sent using useNavigate in BeerCard
  const { state } = useLocation();
  const { id } = state;
  const beer = beers[id];

  return (
    <div className="details-wrapper">
      <h1>{beer.name}</h1>
      <div className="main-wrapper">
        <div className="infos-div">
          <p>{beer.description}</p>
          <p className="ingredients">
            Made with :
            <ul>
              {Object.keys(beer.ingredients).map((key) => (
                <li key={key}> {key} </li>
              ))}
            </ul>
          </p>
          <p>Brewers Tips : {beer.brewers_tips}</p>
        </div>
        <figure>
          <img src={beer.image_url} alt="" />
          <caption>
            Volume : {beer.volume.value} {beer.volume.unit}
          </caption>
        </figure>
      </div>
    </div>
  );
}

export default Details;
