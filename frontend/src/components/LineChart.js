import Chartist from "react-chartist";
import React, { useState } from "react";
// @ts-ignore
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import moment from "moment";

export const LineChart = (data, lengthData) => {
  //   const [plugins, setPlugins] = useState(() => [ChartistTooltip()]);
  const plugins = [ChartistTooltip()];

  function isShowLabel(index) {
    return (
      index === 0 ||
      index === lengthData - 1 ||
      index === Math.floor(lengthData / 2)
    );
  }

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    showPoint: false,
    referenceValue: 5,
    axisX: {
      position: "end",
      showGrid: true,
      labelInterpolationFnc: function (value, index) {
        return isShowLabel(index)
          ? moment(value).format("MM/DD/YY HH:mm:ss")
          : null;
      },
      labelOffset: {
        x: -35,
      },
    },
    axisY: {
      // On the y-axis start means left and end means right
      showGrid: false,
      showLabel: true,
      labelInterpolationFnc: (value) => `${value / 1}°C`,
    },
    chartPadding: {
      right: 15,
      left: 15,
    },
  };

  return (
    <Chartist
      data={data}
      options={{ ...options, plugins }}
      type="Line"
      className="ct-chart ct-golden-section  "
    />
  );
};
