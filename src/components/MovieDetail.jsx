import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    const baseUrl = import.meta.env.VITE_API_MOVIE_URL;
    const response = await axios.get(`${baseUrl}/${id}`, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
      },
    });

    const data = await response.data;
    setMovie(data);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="relative">
      <div className="h-screen max-h-screen absolute -z-10 inset-0 opacity-60 overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          className="bg-cover"
        />
      </div>
      <div className="grid place-items-center gap-8 backdrop-blur-sm bg-white/70 h-screen max-h-screen overflow-hidden">
        <div className=" flex gap-8 mx-8 items-center justify-center">
          <div className=" grid place-items-center w-2/12 h-[750px] bg-cover">
            <img
              height={750}
              width={500}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg h-1/2"
            />
          </div>

          <div className=" w-8/12 ">
            <div className=" mb-4">
              <h1 className="text-4xl font-black">
                {movie.title}{" "}
                <span className=" font-semibold">
                  ({movie.release_date.split("-")[0]})
                </span>
              </h1>

              <span className=" text-gray-600">
                {movie.genres.map((genre) => genre.name).join(", ")} &bull;{" "}
                {minutesToHours(movie.runtime)}
              </span>
            </div>
            <p className="text-gray-700 mb-2 ">{movie.tagline}</p>
            <p className="mb-4">{movie.overview}</p>
            <div className="flex mb-2">
              <span className="mr-4">
                <span className=" font-semibold">Release Date: </span>
                {movie.release_date}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Production Companies: </span>
              {movie.production_companies
                .map((company) => company.name)
                .join(", ")}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Languages: </span>
              {movie.spoken_languages
                .map((lang) => lang.english_name)
                .join(", ")}
            </div>
            <div>
              <span className="font-semibold">Homepage: </span>
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {movie.homepage}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
