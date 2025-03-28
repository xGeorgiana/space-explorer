import { useState, useEffect } from "react";
import axios from "axios";
import mars from "../../../assets/images/mars.jpg";

function MarsWeather() {
  const [weatherInsight, setWeatherInsight] = useState(null);
  const apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  useEffect(() => {
    const fetchWeatherInsight = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`
        );

        const data = response.data;
        const solKeys = data.sol_keys;
        const latestSol = solKeys[solKeys.length - 1];
        const latestData = data[latestSol];

        setWeatherInsight({
          sol: latestSol,
          temperatureAvg: latestData.AT ? latestData.AT.av : "N/A",
          temperatureMin: latestData.AT ? latestData.AT.mn : "N/A",
          temperatureMax: latestData.AT ? latestData.AT.mx : "N/A",
          windSpeedAvg: latestData.HWS ? latestData.HWS.av : "N/A",
          windSpeedMin: latestData.HWS ? latestData.HWS.mn : "N/A",
          windSpeedMax: latestData.HWS ? latestData.HWS.mx : "N/A",
          pressureAvg: latestData.PRE ? latestData.PRE.av : "N/A",
          pressureMin: latestData.PRE ? latestData.PRE.mn : "N/A",
          pressureMax: latestData.PRE ? latestData.PRE.mx : "N/A",
          date: latestData.First_UTC,
          season: latestData.Season,
        });
        console.log(response.data);
      } catch (error) {
        console.error(
          "An error occurred while fetching the weather insight:",
          error
        );
      }
    };
    fetchWeatherInsight();
  }, []);

  return (
    <>
      <h1 className="mars-title">
        Latest weather data from Mars ( SOL{" "}
        {weatherInsight ? weatherInsight.sol : ""} )
      </h1>
      <div className="mars-div-image">
        <img src={mars} className="mars-image" alt="Mars Image" />
      </div>
      {weatherInsight ? (
        <div className="weather">
          <div className="weather-specs">
            <div className="temperature-specs">
              <h2>TEMPERATURE</h2>
              <p>Avg: {weatherInsight.temperatureAvg} °C</p>
              <p>Min: {weatherInsight.temperatureMin} °C</p>
              <p>Max: {weatherInsight.temperatureMax} °C</p>
            </div>
            <div className="wind-specs">
              <h2>WIND SPEED</h2>
              <p>Avg: {weatherInsight.windSpeedAvg} m/s</p>
              <p>Min: {weatherInsight.windSpeedMin} m/s</p>
              <p>Max: {weatherInsight.windSpeedMax} m/s</p>
            </div>
            <div className="pressure-specs">
              <h2>PRESSURE</h2>
              <p>Avg: {weatherInsight.pressureAvg} Pa</p>
              <p>Min: {weatherInsight.pressureMin} Pa</p>
              <p>Max: {weatherInsight.pressureMax} Pa</p>
            </div>
          </div>
          <div className="date-specs">
            <p>Date: {new Date(weatherInsight.date).toDateString()}</p>
            <p>Season: {weatherInsight.season}</p>
          </div>
        </div>
      ) : (
        <p>Loading Mars weather...</p>
      )}
    </>
  );
}
export default MarsWeather;
