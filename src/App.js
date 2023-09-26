
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [units, setUnits] = useState("metric");
  const [buttonText, setButtonText] = useState("Click");

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=2018cbba51883931d26c526daeb1016c`;
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
      setLocation("");
    }
  };

  const handleClick = () => {
    setButtonText(units === "metric" ? "°F" : "°C");
    const newUnits = units === "metric" ? "imperial" : "metric";
    setUnits(newUnits);
    const newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${newUnits}&appid=2018cbba51883931d26c526daeb1016c`;
    console.log("New URL:", newUrl);
    axios
      .get(newUrl)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>
                {data.main.temp.toFixed()}
                {units === "metric" ? "°C" : "°F"}
              </h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {data.main.feels_like.toFixed()}
                  {units === "metric" ? "°C" : "°F"}
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">
                  {data.wind.speed.toFixed()}
                  {units === "metric" ? "MPH" : "KPH"}
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
}

export default App;