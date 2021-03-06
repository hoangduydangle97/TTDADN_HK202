export const TOKEN_PATH = "token";

export const RULE_OPERATOR = {
  EQUAL: "=",
  GREATER_THAN: ">",
  LESS_THAN: "<",
};

export const DEVICE_TYPE = {
  TEMPERATURE_SENSOR: 1,
  GAS_SENSOR: 2,
  LIGHT: 3,
  WATER_PUMP: 4,
};

export const DEVICE_TYPE_TEXT = {
  [DEVICE_TYPE.TEMPERATURE_SENSOR]: "Cảm biến nhiệt độ",
  [DEVICE_TYPE.GAS_SENSOR]: "Cảm biến khí độc",
  [DEVICE_TYPE.LIGHT]: "Đèn báo động",
  [DEVICE_TYPE.WATER_PUMP]: "Bơm nước",
};

export const TIME_TYPE = {
  HOUR: "HOUR",
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
};

export const TIME_TYPE_TEXT = {
  [TIME_TYPE.HOUR]: "1 giờ",
  [TIME_TYPE.DAY]: "1 ngày",
  [TIME_TYPE.WEEK]: "1 tuần",
  [TIME_TYPE.MONTH]: "1 tháng",
};
