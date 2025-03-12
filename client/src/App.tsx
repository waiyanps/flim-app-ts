import { useEffect }  from "react";
import "./App.css"; // Import Tailwind styles

// 7af3888c 

const API_URL: string = 'http://www.omdbapi.com?apikey=7af3888c';


const App: React.FC = () => {

  // Define movie type
  interface Movie {
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
        console.log(data.Search as Movie[]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return <h1>App</h1>;

}

export default App;   
   
   