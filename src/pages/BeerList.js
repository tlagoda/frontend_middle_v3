import React, { useEffect, useState } from "react";
import BeerCard from "../components/BeerCard";
import { useBeer } from "../contexts/BeerContext";
import "./BeerList.css";

const NUMBER_OF_PAGES = 13;
const BEERS_PER_PAGE = 25;

function BeerList() {
  const { loadBeers, beers } = useBeer();
  const [page, setPage] = useState(1);

  //used to manage the deactivation of the 'previous' or 'next' button and page loading
  const isFirstPage = page === 1;
  const isLastPage = page === NUMBER_OF_PAGES;

  useEffect(() => {
    // loading the requested page
    loadBeers(page);
  }, [page]);

  const handlePrevious = () => {
    if (!isFirstPage) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) setPage(page + 1);
  };

  return (
    <div className="beerlist-container">
      <h2>Page {page}</h2>
      <div className="list-div">
        {
          // we only keep the beers of the requested page using slice
          Object.keys(beers)
            .slice(BEERS_PER_PAGE * (page - 1), BEERS_PER_PAGE * page)
            .map((key) => (
              <BeerCard beer={beers[key]} />
            ))
        }
      </div>
      <div className="pagination-div">
        <button disabled={isFirstPage} onClick={handlePrevious}>
          Previous
        </button>
        <span>Page {page}</span>
        <button disabled={isLastPage} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default BeerList;
