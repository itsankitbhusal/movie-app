import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { toast } from "react-toastify";

const HomePage = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          page: page,
          api_key: apiKey,
          sort_by: "popularity.desc",
        },
      });
      const data = response.data;
      if (data) {
        setMovieData((prevData) => [...prevData, ...data.results]);
        setLoading(false);
        setMaxPage(data?.total_pages);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handlePageChange = () => {
    if (page < maxPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getSearchData(e);
  };
  // search
  // https://api.themoviedb.org/3/search/movie?api_key={apikey}&&query=oppen

  const getSearchData = async (e) => {
    try {
      setLoading(true);
      const searchUrl = import.meta.env.VITE_API_SEARCH;
      const response = await axios.get(searchUrl, {
        params: {
          api_key: apiKey,
          query: e.target.search.value,
        },
      });
      e.target.search.value = "Loading...";
      const data = response.data;
      if (data.results.length > 0) {
        setMovieData((prevData) => [...data.results, ...prevData]);
      } else {
        toast.error("No matching results found!!");
      }
      e.target.search.value = "";
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <div className=" text-gray-800 my-4">
      <div className=" text-center my-4 mt-16">
        <h1 className=" text-4xl font-bold ">Movie App with TMDB API</h1>
        <div>
          <form
            onSubmit={handleSearch}
            className=" flex justify-center items-center gap-4 mt-8"
          >
            <input
              type="text"
              name="search"
              className=" border-2 focus:border-blue-400 px-6 rounded-full focus:outline-none my-4 p-3 w-3/12"
              placeholder="Enter a movie name to search"
            />
          </form>
        </div>
      </div>
      {error && toast.error("Some error occurred!")}
      <div className=" flex flex-wrap gap-8 p-8 justify-center items-center">
        {movieData.length > 0
          ? movieData.map((movie) => {
              return (
                <div key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              );
            })
          : ""}
      </div>
      <div className="grid place-items-center w-full">
        {!error && (
          <div
            className="bg-blue-400 font-semibold text-white shadow-2xl  text-2xl px-8 py-4 my-8 rounded-xl hover:cursor-pointer"
            onClick={handlePageChange}
          >
            {loading ? "Loading..." : "Load more data..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
