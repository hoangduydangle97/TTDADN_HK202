import { axiosAdafruit } from "../api/adafruit-api";

function getFeedData(feed_key, getMany = false) {
  return axiosAdafruit.get(`/feeds/${feed_key}/data`, {
    params: {
      limit: !getMany ? 1 : null,
    },
  });
}

export const AdafruitService = {
  getFeedData,
};
