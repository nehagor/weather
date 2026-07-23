import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { useState } from "react";

function App() {
  const { register, handleSubmit, watch } = useForm();
  const city = watch("value");
  const [weather, setWeather] = useState(null);

  const search = async (city) => {
    try {
      console.log(city.value);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value.trim()}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(weather);

  return (
    <div className=" h-screen flex justify-start items-center flex-col bg-gradient-to-br  from-slate-900 via-cyan-900 to blue-900 p-5">
      <form onSubmit={handleSubmit(search)} className="w-full max-w-md">
        <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-xl overflow-hidden">
          <input
            type="text"
            spellCheck={false}
            autoCorrect="off"
            placeholder="Search location..."
            className="flex-1 bg-transparent text-white font-semibold placeholder:text-gray-300 px-6 py-4 outline-none border-none focus:bg-transparent focus:outline-none"
            {...register("value")}
          />

          <button
            disabled={city?.trim().length === 0}
            type="submit"
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all disabled:bg-red-600! duration-300 rounded-full m-1 shadow-lg  active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          >
            <Search size={24} className=" text-white" />
          </button>
        </div>
      </form>
      {weather && weather.cod === 200 && (
        <div className="mt-10 w-full max-w-sm bg-white/15 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 text-white">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{weather.name}</h1>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="weather"
              className="w-32"
            />

            <h2 className="text-6xl font-bold">
              {Math.round(weather.main.temp)}°
            </h2>

            <p className="text-xl capitalize text-gray-200">
              {weather.weather[0].description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
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
              <h3 className="text-2xl font-bold">{weather.main.pressure}</h3>
            </div>
          </div>
        </div>
      )}

      {weather && weather.cod !== 200 && (
        <div className="mt-8 text-red-400 text-xl font-semibold">
          ❌ City Not Found
        </div>
      )}
    </div>
  );
}
export default App;
