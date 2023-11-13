import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MovieListing from "./MovieListing";
import SearchedMovies from "./SearchedMovies";

import { useSelector, useDispatch } from "react-redux";

import { setMovieDetail } from "../actions/movieActions";

const HomePage = () => {
  const movieDetail = useSelector((state) => state.movieDetail);

  const dispatch = useDispatch();
  
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
        // setSearchMovieData((prevData) => [...data.results, ...prevData]);
        dispatch(setMovieDetail(data.results))
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
        <div className="flex flex-col gap-4 md:flex-row justify-between items-center mx-6">
          <h1 className=" text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold sm:font-black tracking-tighter ">
            Movie App
          </h1>
          <div className="">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                onChange={(e) => setMovieSearchText(e.target.value)}
                value={movieSearchText}
                className="w-full border-2 focus:border-blue-400 px-3 text-sm md:text-base md:my-4 p-2 md:py-2 md:px-4 rounded-full focus:outline-none "
                placeholder="Enter a movie name to search"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="w-full grid place-items-center justify-start">
        <SearchedMovies
          movies={movieDetail}
          error={error}
          loading={loading}
        />
      </div>
      <MovieListing />
    </div>
  );
};

export default HomePage;
