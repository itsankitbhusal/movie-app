import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

import { useDispatch, useSelector } from "react-redux";
import { setMovieData } from "../actions/movieActions";

const MovieListing = () => {
  const moviesData = useSelector((state) => state.movie);
  const dispatch = useDispatch();

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
        dispatch(setMovieData(data.results));
        setLoading(false);
        setMaxPage(data?.total_pages);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleNextPage = () => {
    if (page < maxPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <InfiniteScroll
        className="flex flex-column md:flex-row my-8 flex-wrap gap-4 justify-center items-center "
        dataLength={moviesData.length}
        next={handleNextPage}
        hasMore={page < maxPage}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {moviesData.length > 0
          ? moviesData.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))
          : ""}
      </InfiniteScroll>
    </>
  );
};

export default MovieListing;
