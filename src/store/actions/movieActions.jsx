import axios from "../../utils/axios";
import { loadMovie } from "../reducers/movieSlice";

export const asyncloadMovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const credits = await axios.get(`/movie/${id}/credits`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
    const videos = await axios.get(`/movie/${id}/videos`);

    let theUltimateData = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      credits: credits.data,
      translations: translations.data.translations.map(t => t.english_name),
      watchProviders: watchProviders.data.results.IN,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
    };

    // dispatch it
    dispatch(loadMovie(theUltimateData));

    // console.log(theUltimateData);
  } catch (error) {
    console.log(error);
  }
};
