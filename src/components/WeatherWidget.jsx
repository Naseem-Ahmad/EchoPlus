// src/components/Weather/WeatherWidget.jsx
import { useEffect, useState } from "react";
import "../styles/WeatherWidget.css";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=kmh`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          setWeather(data.current_weather);
        } catch (err) {
          console.error("Weather fetch error", err);
        }
      },
      () => {
        // fallback
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true&windspeed_unit=kmh`)
          .then(r => r.json())
          .then(d => setWeather(d.current_weather))
          .catch(e => console.error(e));
      }
    );
  }, []);

  const codeToIcon = (code) => {
    const map = {
      0: "☀️",1:"🌤",2:"⛅",3:"☁️",45:"🌫",
      51:"🌦",53:"🌦",55:"🌦",61:"🌧",63:"🌧",65:"🌧",
      71:"❄️",73:"❄️",75:"❄️",80:"🌦",81:"🌦",82:"🌦",95:"⛈"
    };
    return map[code] ?? "🌡";
  };

  if (!weather) return null;

  return (
    <div className="weather-cloud-wrapper" aria-hidden={false}>
      {/* SVG cloud as decorative background (content not clipped) */}
      <svg className="cloud-svg" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#fff"/>
            <stop offset="100%" stopColor="#f7f9ff"/>
          </linearGradient>
        </defs>
        <path d="
          M40,60
          C10,60 10,30 40,30
          C50,10 90,10 100,30
          C140,30 160,10 180,30
          C200,40 190,70 140,70
          C120,90 60,90 40,70
          Z"
          fill="url(#g1)" stroke="rgba(0,0,0,0.04)" strokeWidth="1"/>
      </svg>

      {/* Actual content sits on top and is never clipped */}
      <div className="weather-cloud-content">
        <div className="weather-row">
          <div className="weather-icon">{codeToIcon(weather.weathercode)}</div>
          <div>
            <div className="weather-title">Current Weather</div>
            <div className="weather-temp">{weather.temperature}°C</div>
            <div className="weather-small">Wind: {weather.windspeed} km/h • Code: {weather.weathercode}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
