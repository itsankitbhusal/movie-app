import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MovieListing from "./MovieListing";
import SearchedMovies from "./SearchedMovies";

const HomePage = () => {
  const [searchMovieData, setSearchMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movieSearchText, setMovieSearchText] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    getSearchData(movieSearchText);
    setMovieSearchText("");
  };
  // search
  // https://api.themoviedb.org/3/search/movie?api_key={apikey}&&query=oppen

  const getSearchData = async (name) => {
    try {
      setLoading(true);
      const searchUrl = import.meta.env.VITE_API_SEARCH;
      const apiKey = import.meta.env.VITE_API_KEY;

      const response = await axios.get(searchUrl, {
        params: {
          api_key: apiKey,
          query: name,
        },
      });
      const data = response.data;
      if (data.results.length > 0) {
        setSearchMovieData((prevData) => [...data.results, ...prevData]);
        setLoading(false);
      } else {
        setError("No data found");
        setLoading(false);
        toast.error("No matching results found!!");
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className=" text-gray-800 py-4 sm:px-24">
      <div className=" text-center my-4 sm:mt-16">
        <h1 className=" text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold sm:font-black tracking-tighter ">Movie App with TMDB API</h1>
        <div>
          <form
            onSubmit={handleSearch}
            className=" flex justify-center items-center gap-4 mt-8"
          >
            <input
              type="text"
              name="search"
              onChange={(e) => setMovieSearchText(e.target.value)}
              value={movieSearchText}
              className="w-full sm:w-10/12 md:w-8/12 border-2 focus:border-blue-400 px-6 rounded-full focus:outline-none my-4 p-3 w-3/12"
              placeholder="Enter a movie name to search"
            />
          </form>
        </div>
      </div>
      <div className="w-full grid place-items-center justify-start">
        <SearchedMovies
          movies={searchMovieData}
          error={error}
          loading={loading}
        />
      </div>
      <MovieListing />
    </div>
  );
};

export default HomePage;
