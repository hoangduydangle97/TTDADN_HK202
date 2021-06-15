import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Button from "./../../../UI/Button/Button";

import classes from "./TemperatureControl.module.scss";

export default class TemperatureControl extends Component {
  static propTypes = {
    controlId: PropTypes.string,
    name: PropTypes.string,
    unit: PropTypes.string,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onUpdateValue: PropTypes.func
  };

  render() {
    if (!this.props.value || !this.props.unit) return null;

    return (
      <div className={classes.TemperatureControl}>
        <div className={classes.Temperature} data-test="temperature">
          <div>
            {this.props.value} °{this.props.unit.toUpperCase()}
          </div>
        </div>
      </div>
    );
  }
}
