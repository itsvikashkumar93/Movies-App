import axios from "../../utils/axios";
import { loadPerson } from "../reducers/personSlice";


export const asyncloadPerson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalId = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);

    let theUltimateData = {
      detail: detail.data,
      externalId: externalId.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };

    // dispatch it
    dispatch(loadPerson(theUltimateData));

    // console.log(theUltimateData);
  } catch (error) {
    console.log(error);
  }
};
