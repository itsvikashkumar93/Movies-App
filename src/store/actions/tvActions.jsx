import axios from "../../utils/axios";
import { loadTv } from "../reducers/tvSlice";

export const asyncloadTv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const credits = await axios.get(`/tv/${id}/credits`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const videos = await axios.get(`/tv/${id}/videos`);

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
    dispatch(loadTv(theUltimateData));

    // console.log(theUltimateData);
  } catch (error) {
    console.log(error);
  }
};
