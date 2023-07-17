import axios from "axios";

const URL = "https://studyDash-server.onrender.com/";

const getTimerSettings = async (userID) => {
  return await axios
    .get(URL + `timerSettings/${userID}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const putTimerSettings = async (settings) => {
  return await axios
    .put(URL + `timerSettings`, settings)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const exports = {
  getTimerSettings,
  putTimerSettings,
};

export default exports;
