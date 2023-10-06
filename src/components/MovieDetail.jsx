import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { MdOutline18UpRating } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import Loader from "./Loader";

const MovieDetail = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trailerLink, setTrailerLink] = useState("");
  const [trailerLoading, setTrailerLoading] = useState(false);

  const fetchMovie = async () => {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_API_MOVIE_URL;
    try {
      const response = await axios.get(`${baseUrl}/${id}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
        },
      });

      const data = await response.data;
      setMovie(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const handleWatchClick = () => {
    videoRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const fetchTrailerFromYoutube = async () => {
    setTrailerLoading(true);
    try {
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            q: `${movie.title} ${movie.release_date} official trailer`,
            key: apiKey,
            part: "snippet",
            type: "video",
          },
        }
      );
      const trailerLink = `${response.data.items[0].id.videoId}`;
      console.log("response from yt", response.data);
      console.log(trailerLink);
      setTrailerLink(trailerLink);
      setTrailerLoading(false);
    } catch (error) {
      setTrailerLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (movie?.title) {
      fetchTrailerFromYoutube();
    }
  }, [movie]);

  if (!movie) {
    <Loader />;
  }

  const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="relative">
      {loading && <Loader />}
      {movie && (
        <div>
          <div className="absolute -z-10 inset-0 opacity-60 overflow-hidden">
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/original/${
                movie.backdrop_path
                  ? movie.backdrop_path
                  : "/hO7KbdvGOtDdeg0W4Y5nKEHeDDh.jpg"
              }`}
              alt={movie.title}
              className="h-screen w-screen bg-no-repeat bg-contain"
            />
          </div>
          <button
            onClick={handleBack}
            className=" absolute z-10 top-1 left-1 md:top-32 md:left-28 "
          >
            <span className=" bg-white grid place-items-center shadow-xl w-8 h-8 rounded-full">
              <BiArrowBack className="text-normal sm:text-lg lg:text-2xl " />
            </span>
          </button>
          <div className="w-full flex flex-col md:gap-4 md:flex-row justify-center items-center backdrop-blur-sm bg-white/70 h-screen max-h-screen overflow-hidden">
            <div className="w-full sm:w-4/12 md:w-2/12 flex justify-center items-center ">
              <img
                loading="lazy"
                height={750}
                width={500}
                src={`https://image.tmdb.org/t/p/w500/${
                  movie.poster_path
                    ? movie.poster_path
                    : "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
                }`}
                alt={movie.title}
                className="aspect-ratio-poster h-[50vh] w-auto rounded-none"
              />
            </div>
            <div className="w-full flex flex-col justify-start items-center sm:w-8/12 md:w-6/12 px-2 ">
              <div className="my-4 sm:8/12 md:w-10/12">
                <div className=" mb-4">
                  <h1 className=" font-bold sm:text-xl md:text-2xl md:font-black lg:text-4xl ">
                    {movie.title}{" "}
                    <span className=" font-semibold">
                      ({movie.release_date.split("-")[0]})
                    </span>
                  </h1>

                  <span className=" text-gray-600 flex items-center gap-2 text-xs sm:text-md">
                    {movie.genres.map((genre) => genre.name).join(", ")} &bull;{" "}
                    {minutesToHours(movie.runtime)}
                    {movie.adult && (
                      <>
                        {" "}
                        &bull; <MdOutline18UpRating className=" text-2xl" />
                      </>
                    )}
                  </span>
                </div>

                <p className="text-gray-700 hidden sm:flex mb-2 text-xs md:text-base ">
                  {movie.tagline}
                </p>
                <p className="mb-4 text-xs md:text-base ">{movie.overview}</p>
                <div className="flex mb-2 text-xs md:text-base">
                  <span className="mr-4">
                    <span className=" font-semibold">Release Date: </span>
                    {formatDate(movie.release_date)}
                  </span>
                </div>
                <div className="mb-4 text-xs md:text-base">
                  <span className="font-semibold">Production Companies: </span>
                  {movie.production_companies
                    .map((company) => company.name)
                    .join(", ")}
                </div>
                <div className="mb-4 text-xs md:text-base">
                  <span className="font-semibold">Languages: </span>
                  {movie.spoken_languages
                    .map((lang) => lang.english_name)
                    .join(", ")}
                </div>
                <div className=" flex gap-4 items-center text-xs md:text-base">
                  <span className="font-semibold flex items-center gap-2">
                    <AiFillHeart className=" text-xs md:text-base" />
                    {movie.vote_count}{" "}
                  </span>
                  <span className="font-semibold  flex items-center gap-2 text-xs md:text-base">
                    <AiFillStar className=" text-xs md:text-base" />
                    {movie.vote_average.toFixed(1)}{" "}
                  </span>
                  <button
                    onClick={handleWatchClick}
                    className=" bg-red-500 px-4 py-2 rounded text-white font-semibold text-xs"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* set trailer */}
          <div className=" grid place-items-center h-screen ">
            {/*       // <iframe width="978" height="550" src="https://www.youtube.com/embed/5BbjtdPb-KA" ></iframe> */}
            {trailerLoading ? (
              "Fetching trailer data"
            ) : (
              <iframe
                ref={videoRef}
                className=" w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                src={`https://www.youtube.com/embed/${trailerLink}`}
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
