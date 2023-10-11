import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyModal from "./MyModal";

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { poster_path, release_date, title } = movie;
  const imageUrl = import.meta.env.VITE_IMG_URL;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const trimTitle = (title) => {
    let movieTitle = title;
    if (movieTitle.length > 25) {
      movieTitle = movieTitle.slice(0, 20) + "...";
    } else {
      movieTitle = title;
    }
    return movieTitle;
  };
  const handleCardClick = (movie) => {
    console.log("card clicked");
    console.log("movie: ", movie);
    navigate(`/movie/${movie.id}`);
  };
  const handleMouseEnter = (e) => {
    setShowModal(true);
  };
  const handleMouseLeave = () => {
    setShowModal(false);
  };
  return (
    <>
      <div
        onClick={() => handleCardClick(movie)}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={handleMouseLeave}
        className="relative shadow-gray-200 mb-4 outline outline-gray-200 outline-1 lg:w-[16vw] rounded-md hover:shadow-md  hover:shadow-gray-200 transition-all hover:cursor-pointer hover:outline-blue-400"
      >
        {showModal ? <MyModal overview={movie.overview} /> : null}

        <div className=" grid place-items-center  bg-white rounded-md">
          <div className="w-50 h-50 bg-cover ">
            <img
              loading="lazy"
              draggable={false}
              className=" w-50 h-50 aspect-ratio-poster  rounded-md rounded-b-none"
              width={250}
              src={`${imageUrl}${
                poster_path ? poster_path : "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
              }`}
              alt={title}
            />
          </div>
          <div className="text-center max-w-[250px] rounded-md px-8 h-20 max-h-max py-4  flex flex-col justify-evenly w-full">
            <div title={title} className=" font-bold">
              {trimTitle(title)}
            </div>
            <div className="">{formatDate(release_date)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
