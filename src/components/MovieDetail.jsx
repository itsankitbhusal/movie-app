import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { MdOutline18UpRating } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

const MovieDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerLink, setTrailerLink] = useState("");
  const [trailerLoading, setTrailerLoading] = useState(false);

  const fetchMovie = async () => {
    const baseUrl = import.meta.env.VITE_API_MOVIE_URL;
    try {
      const response = await axios.get(`${baseUrl}/${id}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
        },
      });

      const data = await response.data;
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

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
    return <div>Loading...</div>;
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
      <div className="h-screen max-h-screen absolute -z-10 inset-0 opacity-60 overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          className="bg-cover"
        />
      </div>
      <div className="grid place-items-center gap-8 backdrop-blur-sm bg-white/70 h-screen max-h-screen overflow-hidden">
        <div className=" flex items-center gap-8 justify-center ">
          <div className=" grid place-items-center w-2/12 h-[750px] bg-cover relative">
            <div>
              <button
                onClick={handleBack}
                className=" hover:bg-gray-600 hover:text-white text-gray-600 outline outline-2 hover: outline-gray-600 transition-all rounded-lg shadow-2xl absolute z-10 top-32 w-auto px-5 py-2 font-semibold flex place-items-center gap-4"
              >
                <span className=" flex items-center  justify-center -ml-1 w-full gap-4">
                  <BiArrowBack className=" text-2xl " />
                  Back
                </span>
              </button>
              <img
                height={750}
                width={500}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg h-1/2"
              />
            </div>
          </div>

          <div className=" w-6/12">
            <div className=" mb-4">
              <h1 className="text-4xl font-black">
                {movie.title}{" "}
                <span className=" font-semibold">
                  ({movie.release_date.split("-")[0]})
                </span>
              </h1>

              <span className=" text-gray-600 flex items-center gap-2">
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
            <p className="text-gray-700 mb-2 ">{movie.tagline}</p>
            <p className="mb-4">{movie.overview}</p>
            <div className="flex mb-2">
              <span className="mr-4">
                <span className=" font-semibold">Release Date: </span>
                {formatDate(movie.release_date)}
              </span>
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
            <div className=" flex gap-4 items-center">
              <span className="font-semibold flex items-center gap-2">
                <AiFillHeart className=" text-xl" />
                {movie.vote_count}{" "}
              </span>
              <span className="font-semibold  flex items-center gap-2">
                <AiFillStar className=" text-xl" />
                {movie.vote_average.toFixed(1)}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* set trailer */}
      <div className=" grid place-items-center h-screen">
        {/*       // <iframe width="978" height="550" src="https://www.youtube.com/embed/5BbjtdPb-KA" ></iframe> */}
        {trailerLoading ? (
          "Fetching trailer data"
        ) : (
          <iframe
            className=" w-full h-full"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            src={`https://www.youtube.com/embed/${trailerLink}`}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
