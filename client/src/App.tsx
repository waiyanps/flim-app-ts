import { useEffect, useState }  from "react";
import MovieCard from "./MovieCard";
import "./App.css"; // Import Tailwind styles
import SearchIcon from './search.svg'

// 7af3888c 

const API_URL: string = 'http://www.omdbapi.com?apikey=7af3888c';

const App: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  // Define movie type
  type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }
  
  // Update function with TypeScript types
  const searchMovies = async (title: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search as Movie[]);
      } else {
        setMovies([]);
      }

    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>MovieIsland</h1>
      <div className="search">
        <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies"
        />
      <img 
        src={SearchIcon}
        alt="search"
        onClick={() => searchMovies(searchTerm)}
      />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie1={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>

      )}
       </div>
  );
};

export default App;   
   
   