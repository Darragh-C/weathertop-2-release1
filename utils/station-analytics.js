'use strict';

const stationStore = require("../models/station-store");
const metricConversion = require("./metric-conversion");

const stationAnalytics = {

  updateWeather(station) {
    station.latestReading = stationStore.getLatestReading(station);
    station.latestReading.weather = metricConversion.currentWeather(station.latestReading.code);
    station.latestReading.weatherIcon = metricConversion.weatherIcon(station.latestReading.code);
    station.latestReading.tempFar = metricConversion.tempFar(station.latestReading.temp);
    station.latestReading.beaufourt = metricConversion.beaufourtScale(station.latestReading.windSpeed);
    station.latestReading.windCompass = metricConversion.windDirCalc(station.latestReading.windDirection);
    station.latestReading.windChill = stationAnalytics.windChill(station.latestReading);
    return station;
  },

  windChill(reading) {
    let t = reading.temp;
    let v = reading.windSpeed;
    return (13.12 + (0.6215 * t) - (11.37 * (Math.pow(v, 0.16))) + ((0.3965 * t)*(Math.pow(v, 0.16)))).toFixed(2);
  },
}

module.exports = stationAnalytics;