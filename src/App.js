import React, { useState,useEffect,useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import { BASE_URL } from './utils/constants';
import AddMovie from './components/AddMovie';


function App() {
  const [movies, setMovies] = useState([])
  const [isLoding, setIsLoding] = useState(false)
  const [error, setError] = useState(null)

 

  const fetchMoviesHandler = useCallback(async()  => {
      
      setIsLoding(true)
      try {
        const response = await fetch(`${BASE_URL}/movies.json`)
        if (!response.ok) {
          throw new Error('jkkl')
        }
        const data = await response.json()
        const transformedMovies = data.result.map((movie) => {
          return {
            id: movie.properties.episode_id,
            title: movie.properties.title,
            openingText: movie.properties.opening_crawl,
            releaseDate: movie.properties.release_date
          }
        })
        setMovies(transformedMovies)
        console.log(transformedMovies);
        console.log(data.result);
      } catch (error) {
        setError(error.message)
      }
      setIsLoding(false)
    
  
  },[]) 
  useEffect(()=>{
    fetchMoviesHandler()
  },[fetchMoviesHandler])


  let movieContent = <p>Found no movies</p>
  if (isLoding) {
    movieContent = <p>...isLoding</p>
  }
  if (movies.length > 1) {
    movieContent = <MoviesList movies={movies} />
  }
  if (error) {
    movieContent = <p>{error}</p>
  }
  const  addMovieHandler=async (movie)=>{
const response=await fetch(`${BASE_URL}/movies.json`,{
  method:'POST',
  body:JSON.stringify(movie),
  headers:{
    'Contex-type':'application/json'
  }
})
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
       
      </section>

      <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {movieContent}

      </section>
    </React.Fragment>
  );
}

export default App;
