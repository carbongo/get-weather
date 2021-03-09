#! /usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { EventEmitter } = require("events");
const source = new EventEmitter();
const http = require("http");
const querystring = require("querystring");
const config = require("./config");
const argv = yargs(hideBin(process.argv))
  .usage("get-weather [OPTION]")
  .example(
    "get-weather -c (--city) London",
    "Display current weather for London, UK"
  )
  .example(
    'get-weather -c (--city) "St Davids"',
    "Display current weather for Saint Davids, Barbados"
  )
  .alias("c", "city")
  .describe("c", "City (required)")
  .help("h")
  .alias("h", "help")
  .alias("v", "version").argv;

const params = { access_key: config.weatherstackApiKey(), query: argv.city };
const API_URL = "http://api.weatherstack.com/current?";

source.on("message", (message) => {
  console.log(message);
  process.exit(-1);
});

function showTip() {
    const msg = "-c (--city) option is required. Type 'get-weather --help' for info.";
    source.emit("message", msg);
}

if (!argv.city) {
  showTip();
} else {
  showCurrentWeather(API_URL + querystring.stringify(params));
}

function showCurrentWeather(url) {
  http
    .get(url, (res) => {
      const statusCode = res.statusCode;
      if (statusCode !== 200) {
        console.error(`Status Code: ${statusCode}`);
        return;
      }
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => (rawData += chunk));
      res.on("end", () => {
        let d = JSON.parse(rawData);
        let msg =
          `${d.location.name}/${d.location.country}: ` +
          `${d.current.temperature}°C, ${d.current.weather_descriptions[0]}`;
        source.emit("message", msg);
      });
    })
    .on("error", (e) => {
      source.emit("message", `Got error: ${e.message}`);
    });
}
