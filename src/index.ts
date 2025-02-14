import { program } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet'

const baseURL = "http://api.weatherapi.com/v1/forecast.json"

console.log(figlet.textSync("Weather CLI"));

program.version('1.0.0')
.description("My Node CLI")
.option("-c, --city <type>", "Your city")
.option("-a, --apikey <type>", "Your API key")
.action((options) => {
  getWeatherData(options.city, options.apikey);
});

async function getWeatherData (city: string, apiKey: string){
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
    let message = "Unknown error"
    if(error instanceof Error){
      message = error.message;
    }
    console.log(chalk.red('An error occurred while fetching the weather data. ' + message));
  }
  
}

function printResponse(weatherData: any){
  console.log(chalk.green(`${weatherData.location.name}: ${weatherData.current.temp_c}°C and ${weatherData.current.condition.text}`));
}


program.parse(process.argv);