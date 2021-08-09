import { axiosAdafruit } from "../api/adafruit-api";

function getFeedData(feed_key, getMany = false) {
  return axiosAdafruit.get(`/feeds/${feed_key}/data`, {
    params: {
      limit: !getMany ? 1 : null,
    },
  });
}

function getChartFeedData(feed_key, start_time, end_time) {
  let params = {
    start_time: start_time,
    end_time: end_time,
  };

  return axiosAdafruit.get(`/feeds/${feed_key}/data/chart`, {
    params: params,
  });
}

export const AdafruitService = {
  getFeedData,
  getChartFeedData,
};
