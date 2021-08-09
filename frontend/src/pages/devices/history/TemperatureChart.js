import { Card, FormLabel, FormSelect } from "@themesberg/react-bootstrap";
// @ts-ignore
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import { LineChart } from "components/LineChart";
import { TIME_TYPE, TIME_TYPE_TEXT } from "const";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Chartist from "react-chartist";
import { AdafruitService } from "services/adafruit.service";
import classes from "../RoomDevices.module.scss";

export const TemperatureChart = () => {
  const [tempData, settempData] = useState({ labels: [], series: [[]] });
  const [valueTimeSelect, setValueTimeSelect] = useState(TIME_TYPE.DAY);
  const [lengthData, setLengthData] = useState(0);
  const [loading, setloading] = useState(true);

  const data = {
    labels: tempData.labels,
    series: tempData.series,
  };

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
        return index === 0 ||
          index === lengthData - 1 ||
          index === Math.floor(lengthData / 2)
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

  const [plugins, setPlugins] = useState(() => [ChartistTooltip()]);

  function getLabels(data) {
    return data.map((value) => new Date(value[0]).toLocaleString());
  }

  function getSeries(data) {
    let series = [];
    const insideSeries = data.map((value) => value[1] * 1);
    series.push(insideSeries);
    return series;
  }

  function mapChartData(data) {
    const dataToCal = data.data.data;
    setLengthData(dataToCal.length * 1);
    const labels = getLabels(dataToCal);
    const series = getSeries(dataToCal);
    return {
      labels,
      series,
    };
  }

  function calCulateStartTimeEndTime(range) {
    const end_time = new Date().toISOString();
    let now = new Date();
    let start_time;
    switch (range) {
      case TIME_TYPE.HOUR:
        now.setHours(now.getHours() - 1);
        break;
      case TIME_TYPE.DAY:
        now.setDate(now.getDate() - 1);
        break;
      case TIME_TYPE.WEEK:
        now.setDate(now.getDate() - 7);
        break;
      case TIME_TYPE.MONTH:
        now.setDate(now.getDate() - 30);
        break;
      default:
        break;
    }
    start_time = now.toISOString();

    return {
      start_time,
      end_time,
    };
  }

  useEffect(() => {
    setloading(true);
    const { start_time, end_time } = calCulateStartTimeEndTime(valueTimeSelect);

    AdafruitService.getChartFeedData("temperature", start_time, end_time)
      .then(mapChartData)
      .then((data) => {
        settempData(data);
      })
      .then(() => setloading(false));
  }, [valueTimeSelect]);

  const handleChange = (event) => {
    const { value } = event.target;
    setValueTimeSelect(value);
  };

  let Chart;

  if (!loading) {
    Chart = tempData.labels.length ? (
      LineChart(data, lengthData)
    ) : (
      // <LineChart data={data} lengthData={lengthData} />
      <div>No data</div>
    );
  } else {
    Chart = <div>loading...</div>;
  }

  return (
    <>
      <div className={classes.SelectTime}>
        <FormLabel>Time</FormLabel>
        <FormSelect onChange={handleChange} value={valueTimeSelect} required>
          {Object.keys(TIME_TYPE_TEXT).map((key, index) => {
            return (
              <option key={key} value={key}>
                {TIME_TYPE_TEXT[key]}
              </option>
            );
          })}
        </FormSelect>
      </div>
      {Chart}
    </>
  );
};
