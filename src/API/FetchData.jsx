import axios from "axios";
import {
  fetchApiRequest,
  fetchApiSuccess,
  fetchApiError,
} from "../components/Reducer";
export const fetchData = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { heroes } = state;
    if (heroes.length === 731) {
      return;
    }
    dispatch(fetchApiRequest());
    const ids = Array.from({ length: 731 }, (value, index) => index + 1);
    const requestSize = 15; // Limit the number of concurrent requests
    const allData = []; // Accumulate all heroes here
    const localStorageKey = "superheroesData"; // Key for storing data in localStorage
    // Check if data is already stored in localStorage
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      dispatch(fetchApiSuccess(parsedData));
      return;
    }
    for (let i = 0; i < ids.length; i += requestSize) {
      const requestIds = ids.slice(i, i + requestSize);
      const requests = requestIds.map((id) =>
        axios.get(`https://superheroapi.com/api/612689784298868/${id}`)
      );
      const responses = await Promise.all(requests);
      const requestData = responses.map((response) => response.data);
      allData.push(...requestData); // Add the current request of heroes to allData
    }
    // Save data in localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(allData));
    dispatch(fetchApiSuccess(allData)); // Dispatch fetchApiSuccess after the loop
  } catch (error) {
    dispatch(fetchApiError(error.message));
  }
};
