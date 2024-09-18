import React, { useEffect, useRef, useState } from 'react'
import './titlecards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2FmYmJiOWQyOWNlMjQzNWQ1Y2ZhZDQ4ODA3NzlhYSIsIm5iZiI6MTcyNTk3NjA5Ny4yNzE0MTUsInN1YiI6IjY2ZTA0ZDFiM2JjOTEyOWE4YjI4ZTE4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oHDxNrbeTRSSFBwpYUqR04Sb0I9AmCTl9STmpLBvvBM'
    }
  };
  
  

  const handleWheel = (event) =>{
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY
  } 

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardRef.current.addEventListener('wheel', handleWheel)
  },[])

  return (
    <div className='title-cards'>
      <h2>{title? title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
