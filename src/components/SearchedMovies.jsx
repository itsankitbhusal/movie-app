import MovieCard from "./MovieCard";
import Loader from "./Loader";

const SearchedMovies = ({ movies, error, loading }) => {
  return (
    <>
      {loading && (
        <div className=" w-screen h-full grid place-items-center">
          <Loader />
        </div>
      )}
      {movies.length > 0 && (
        <div className=" w-full mb-20">
          <div className=" font-bold sm:font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tighter w-full">
            Searched Movies
          </div>
          <div className=" flex flex-column md:flex-row my-8 flex-wrap gap-4 justify-center items-center ">
            {movies.map((movie) => {
              return (
                <div key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </div>
          <div className=" w-full grid place-items-center">
            <div className=" bg-gray-200 w-1/2 h-[.1rem]"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchedMovies;
