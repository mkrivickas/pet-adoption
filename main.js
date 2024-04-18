async function start() {
  const weatherPromise = await fetch(
    // "https://api.weather.gov/gridpoints/MFL/110,50/forecast"
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=apparent_temperature"
  );
  const weatherData = await weatherPromise.json();
  // const ourTemperature = weatherData.properties.periods[0].temperature;
  const ourTemperature = weatherData.hourly.apparent_temperature[12];
  document.querySelector("#temperature-output").textContent = ourTemperature;
}

start();
