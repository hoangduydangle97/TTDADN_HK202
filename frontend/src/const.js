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

export const ENUM_TIME_TEMP_CHART = {
  HOUR: "HOUR",
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
};

export const SELECT_TIME_FOR_TEMP_CHART = {
  HOUR: "1 giờ",
  DAY: "1 ngày",
  WEEK: "1 tuần",
  MONTH: "1 tháng",
};
