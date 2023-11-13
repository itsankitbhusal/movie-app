import { MOVIES_DATA, MOVIE_DETAIL } from "../actionTypes";

export const setMovieData = (movieData) => ({
  type: MOVIES_DATA,
  payload: movieData,
});

export const setMovieDetail = (movieDetail) => ({
  type: MOVIE_DETAIL,
  payload: movieDetail,
});
