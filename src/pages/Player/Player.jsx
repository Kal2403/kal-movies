import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams()
  const navigate = useNavigate()

  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWM2ZjEyM2U1ODU2ZTMxYzk3MjcyOTkxN2EwZjcxOCIsIm5iZiI6MTcyMjk5OTI0OC45MTQ5MjksInN1YiI6IjY2YjAzOTc0YzgxZDQ0YjA1NTJmMzJjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sCaARcNfoWbwLtwFKiwj0VDEx3oz8wOmzMimpwnMXnI'
    }
  };

  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        } else {
          setError('No results found');
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('error:' + err);
        setError('Error fetching data');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" title='trailer' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player;
