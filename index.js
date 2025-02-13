#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';

const baseURL = "http://api.weatherapi.com/v1/forecast.json"

program.version('1.0.0')
.description("My Node CLI")
.option("-c, --city <type>", "Your city")
.option("-a, --apikey <type>", "Your API key")
.action((options) => {
  getWeatherData(options.city, options.apikey);
});

async function getWeatherData (city, apiKey){
  if(!city || !apiKey){
    console.log(chalk.red("Please provide a city and an API key"));
    return;
  }

  const url = `${baseURL}?key=${apiKey}&q=${city}`

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    printResponse(json);

  } catch (error) {
    console.log(chalk.red('An error occurred while fetching the weather data. ' + error.message));
  }
  
}

function printResponse(weatherData){
  console.log(chalk.green(`${weatherData.location.name}: ${weatherData.current.temp_c}°C and ${weatherData.current.condition.text}`));
}


program.parse(process.argv);