import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const MovieListing = () => {
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
        dataLength={movieData.length}
        next={handleNextPage}
        hasMore={page < maxPage}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {movieData.length > 0
          ? movieData.map((movie) => (
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
