import { useForm } from "react-hook-form";
import { Search, CloudOff } from "lucide-react";
import { useState } from "react";

function App() {
  const { register, handleSubmit, watch } = useForm();
  const city = watch("value");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async (data) => {
    setLoading(true);
    try {
      const cityName = data.value.trim();
      console.log(cityName);
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl),
      ]);
      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();
      setWeather(weatherData);
      setForecast(forecastData);

      console.log(weatherData);
      console.log(forecastData, "hii ");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-sky-300 py-8 px-5 flex flex-col items-center relative overflow-hidden">
      <div className="background-clouds">
        {/* Cloud 1 */}
        <div className="bg-cloud bg-cloud-1">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Cloud 2 */}
        <div className="bg-cloud bg-cloud-2">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Cloud 3 */}
        <div className="bg-cloud bg-cloud-3">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Cloud 4 */}
        <div className="bg-cloud bg-cloud-4">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Cloud 5 */}
        <div className="bg-cloud bg-cloud-5">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(search)}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-xl overflow-hidden ">
          <input
            type="text"
            spellCheck={false}
            autoCorrect="off"
            placeholder="Search location..."
            className="flex-1 bg-transparent text-white font-semibold placeholder:text-gray-300 px-6 py-4 outline-none border-none focus:bg-transparent focus:outline-none"
            {...register("value", { required: true })}
          />

          <button
            disabled={loading || city?.trim().length === 0}
            type="submit"
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all disabled:bg-red-500 duration-300 rounded-full m-1 shadow-lg  active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          >
            <Search size={24} className=" text-white" />
          </button>
        </div>
        {loading && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-cyan-400 rounded-full animate-spin"></div>

              <p className="mt-4 text-white text-xl font-semibold">
                Searching...
              </p>
            </div>
          </div>
        )}
      </form>

      {/* 3D Clouds */}

      <div className="cloud-area relative z-10">
        <div className="real-cloud cloud-1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="real-cloud cloud-2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="real-cloud cloud-3">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {weather && weather.cod === 200 && (
        <div className="relative z-10 mt-2 w-full max-w-sm rounded-3xl bg-white/15 backdrop-blur-xl border-2 border-white/30 shadow-2xl shadow-black/40 p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">{weather.name}</h1>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="weather"
              className="w-24 h-24"
            />

            <h2 className="text-5xl font-bold mt-1">
              {Math.round(weather.main.temp)}°
            </h2>

            <p className="text-lg text-gray-200 capitalize">
              {weather.weather[0].description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-300">Humidity</p>
              <h3 className="text-2xl font-bold">{weather.main.humidity}%</h3>
            </div>

            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-300">Wind</p>
              <h3 className="text-2xl font-bold">{weather.wind.speed} m/s</h3>
            </div>

            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-300">Feels Like</p>
              <h3 className="text-2xl font-bold">
                {Math.round(weather.main.feels_like)}°
              </h3>
            </div>

            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-300">Pressure</p>
              <h3 className="text-2xl font-bold">
                {weather.main.pressure} hPa
              </h3>
            </div>
          </div>
        </div>
      )}
      {forecast && forecast.cod === "200" && (
        <div className="relative z-10 mt-8 w-full max-w-6xl p-6 bg-white/10 rounded-2xl">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            5-Day Forecast
          </h2>

          <div className="flex justify-between overflow-x-auto pb-4">
            {forecast.list
              .filter((item) => item.dt_txt.includes("12:00:00"))
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4 text-white hover:scale-105 hover:bg-white/10 transition-all duration-300 "
                >
                  <h3 className="text-2xl font-bold text-center">
                    {new Date(item.dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </h3>

                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="weather"
                    className="w-16 h-16 mx-auto"
                  />

                  <h2 className="text-4xl font-bold text-center">
                    {Math.round(item.main.temp)}°
                  </h2>

                  <p className="capitalize text-center text-gray-200 text-sm">
                    {item.weather[0].description}
                  </p>

                  <div className="mt-4 border-t border-white/20 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Humidity</span>
                      <span>{item.main.humidity}%</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Wind</span>
                      <span>{item.wind.speed} m/s</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {weather && weather.cod !== 200 && (
        <div className="relative z-10 mt-8 w-full max-w-sm">
          <div className="city-error-card">
            <div className="error-cloud">
              <div className="error-icon">
                <CloudOff size={48} strokeWidth={1.6} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-5">
              🌥️ City Not Found ❌
            </h2>
            <p className="text-gray-200 mt-2">
              Hmm... we couldn't find that location.
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Check the spelling and try searching again.
            </p>

            <div className="error-line"></div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
