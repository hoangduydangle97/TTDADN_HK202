import { Card, FormLabel, FormSelect } from "@themesberg/react-bootstrap";
// @ts-ignore
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import { ENUM_TIME_TEMP_CHART, SELECT_TIME_FOR_TEMP_CHART } from "const";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Chartist from "react-chartist";
import { AdafruitService } from "services/adafruit.service";
import classes from "./RoomDevices.module.scss";

export const TemperatureChart = () => {
  const [tempData, settempData] = useState({ labels: [], series: [[]] });
  const [valueTimeSelect, setValueTimeSelect] = useState(
    ENUM_TIME_TEMP_CHART.WEEK
  );
  const [spaceAxisX, setspaceAxisX] = useState(5);
  const [paramsTimeFetch, setParamsTimeFetch] = useState({
    hours: 24,
    start_time: "",
    end_time: "",
  });
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
        console.log(value);
        return index % spaceAxisX === 0
          ? moment(value).format("MM/DD/YY HH:mm:ss")
          : null;
      },
      labelOffset: {
        x: -15,
      },
    },
    axisY: {
      // On the y-axis start means left and end means right
      showGrid: false,
      showLabel: true,
      labelInterpolationFnc: (value) => `${value / 1}°C`,
    },
    chartPadding: {
      right: 20,
      left: 20,
    },
  };

  const [plugins, setPlugins] = useState(() => [ChartistTooltip()]);

  // const plugins = [ChartistTooltip()];

  function mapChartData(resData) {
    return {};
  }

  useEffect(() => {
    setloading(true);

    AdafruitService.getChartFeedData(
      "temperature",
      paramsTimeFetch.hours,
      paramsTimeFetch.start_time,
      paramsTimeFetch.end_time
    )
      .then(mapChartData)
      .then((data) => {
        // let series = [];
        // const totalData = data.data.data.length * 1;
        // setspaceAxisX(Math.floor(totalData / 5));
        // const labels = data.data.data.map((value) =>
        //   new Date(value[0]).toLocaleString()
        // );

        // const insideSeries = data.data.data.map((value) => value[1] * 1);
        // series.push(insideSeries);

        settempData(data);
      })
      .then(() => setloading(false));
  }, [valueTimeSelect]);

  // function calCulateStartTimeEndTime(range: ENUM_TIME_TEMP_CHART) {

  // }

  const handleChange = (event) => {
    const { value } = event.target;
    setValueTimeSelect(value);
    const end_time = new Date().toISOString();
    let now = new Date();
    let start_time;
    switch (value) {
      case ENUM_TIME_TEMP_CHART.HOUR:
        setParamsTimeFetch({
          hours: 1,
          start_time: "",
          end_time: "",
        });
        break;

      case ENUM_TIME_TEMP_CHART.DAY:
        setParamsTimeFetch({
          hours: 24,
          start_time: "",
          end_time: "",
        });
        break;
      case ENUM_TIME_TEMP_CHART.WEEK:
        now.setDate(now.getDate() - 7);
        start_time = now.toISOString();

        setParamsTimeFetch({
          hours: 0,
          start_time,
          end_time,
        });
        break;

      case ENUM_TIME_TEMP_CHART.MONTH:
        now.setDate(now.getDate() - 30);
        start_time = now.toISOString();

        setParamsTimeFetch({
          hours: 0,
          start_time,
          end_time,
        });
        break;
      default:
        break;
    }
  };

  // var responsiveOptions = [
  //   [
  //     "screen and (min-width: 678px)",
  //     {
  //       chartPadding: {
  //         right: 20,
  //         left: 20,
  //         bottom: 200,
  //       },
  //       seriesBarDistance: 10,
  //     },
  //   ],
  //   [
  //     "screen and (max-width: 640px)",
  //     {
  //       seriesBarDistance: 5,
  //     },
  //   ],
  // ];

  let Chart;

  if (!loading) {
    Chart = tempData.labels.length ? (
      <Chartist
        data={data}
        options={{ ...options, plugins }}
        type="Line"
        // className="ct-golden-section ct-series-g ct-double-octave ct-include-alternative-responsive-containers"
        className="ct-chart ct-golden-section  "
      />
    ) : (
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
          {Object.keys(SELECT_TIME_FOR_TEMP_CHART).map((key, index) => {
            return (
              <option key={key} value={key}>
                {SELECT_TIME_FOR_TEMP_CHART[key]}
              </option>
            );
          })}
        </FormSelect>
      </div>
      {Chart}
    </>
  );
};
