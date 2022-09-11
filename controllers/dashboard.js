"use strict";

const logger = require("../utils/logger.js");
const stationStore = require('../models/station-store.js');
const stationAnalytics = require('../utils/station-analytics');
const metricConversion = require('../utils/metric-conversion');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const stations = stationStore.getAllStations();
    const latestReadings = [];
    for (let station of stations) {
      if (station.readings.length > 0) {
        stationAnalytics.updateWeather(station);
      }
    }
    const viewData = {
      title: "Weathertop 2 release 1",
      stations: stations,
    };
    logger.info('about to render', stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      stationName: request.body.stationName,
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
