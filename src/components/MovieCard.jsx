import { useNavigate } from "react-router-dom";


const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const {
    adult,
    backdrop_path,
    genre_ids,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
  } = movie;
  const imageUrl = import.meta.env.VITE_IMG_URL;

    const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
    };
    const trimTitle = (title) => {
        let movieTitle = title;
        if (movieTitle.length > 25) {
            movieTitle = movieTitle.slice(0,20)+ "..."
        } else {
            movieTitle = title;
        }
        return movieTitle
    }
  const handleCardClick = (movie) => {
    console.log("card clicked");
    console.log("movie: ", movie);
    navigate(`/movie/${movie.id}`);
  }
  //   {
  //     "adult": false,
  //     "backdrop_path": "/1syW9SNna38rSl9fnXwc9fP7POW.jpg",
  //     "genre_ids": [
  //         28,
  //         878,
  //         12
  //     ],
  //     "id": 565770,
  //     "original_language": "en",
  //     "original_title": "Blue Beetle",
  //     "overview": "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",
  //     "popularity": 2972.534,
  //     "poster_path": "/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
  //     "release_date": "2023-08-16",
  //     "title": "Blue Beetle",
  //     "video": false,
  //     "vote_average": 7.2,
  //     "vote_count": 956
  // },
  return (
    <div onClick={()=>handleCardClick(movie)} className="shadow-gray-200 shadow-2xl  rounded-md hover:shadow-lg  hover:shadow-gray-200 transition-all hover:cursor-pointer">
      {/* <div>{adult}</div>
          <div>
          <img src={`${imageUrl}${backdrop_path}`} alt={title} />
          </div>
          <div>{genre_ids}</div>
          <div>{original_language}</div>
          <div>{original_title}</div>
          <div>{overview}</div>
          <div>{popularity}</div>
          <div>{release_date}</div>
          <div>
              <img src={`${imageUrl}${poster_path}`} alt={title} />
          </div>
          <div>{video}</div>
          <div>{title}</div>
          <div>{vote_average}</div>
          <div>{vote_count}</div> */}

      <div className=" grid place-items-center  bg-white rounded-md">
        <div className=" ">
          <img draggable={false} className=" rounded-md rounded-b-none" width={250} src={`${imageUrl}${poster_path}`} alt={title} />
        </div>
        <div className="text-center max-w-[250px] rounded-md px-8 h-20 max-h-max py-4  flex flex-col justify-evenly w-full">
          <div title={title} className=" font-bold">{trimTitle(title)}</div>
          <div className="">{formatDate(release_date)}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
