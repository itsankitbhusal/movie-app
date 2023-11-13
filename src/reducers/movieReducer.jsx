import { MOVIES_DATA, MOVIE_DETAIL } from "../actionTypes";

const initialState = {
  movie: [],
  movieDetail: {},
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES_DATA:
      return {
        ...state,
        movie: [...state.movie, ...action.payload],
      };
    case MOVIE_DETAIL:
      console.log("data in reducer: ", action.payload)
      return {
        ...state,
        movieDetail: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
