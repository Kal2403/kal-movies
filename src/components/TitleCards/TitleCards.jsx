import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apidata, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWM2ZjEyM2U1ODU2ZTMxYzk3MjcyOTkxN2EwZjcxOCIsIm5iZiI6MTcyMjgyNTQ3Ni45Nzc5LCJzdWIiOiI2NmIwMzk3NGM4MWQ0NGIwNTUyZjMyYzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kZ_6td6vOUT8ufFBmHEgJpwEmpCwCBmfORjo-hZZoM0'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options);
        const data = await response.json();
        if (data.results) {
          setApiData(data.results);
        } else {
          console.error('No results found');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  return (
    <div className='titlecards'>
      <h2>{title ? title : "Popular on KalMovies"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apidata.map((card, i) => (
          <Link to={`/player/${card.id}`} className='card' key={i}>
            {card.backdrop_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            ) : (
              <p>No image available</p>
            )}
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
