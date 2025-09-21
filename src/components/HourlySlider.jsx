import React, { useContext, useRef, useState } from "react";
import { HourlyWeatherContext } from "../context/HourlyWeatherContext";
import { NavLink } from "react-router-dom";
import { IoIosArrowDropleft,IoIosArrowDropright } from "react-icons/io";


const HourlySlider = () => {
  const { hourlyData, loading, error } = useContext(HourlyWeatherContext);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollContainerRef = useRef(null);

  if (loading)
    return <p className="text-center mt-10">Loading hourly data...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  const scrollLeft = () =>
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div className="w-full max-w-7xl bg-white/30 backdrop-blur-md rounded-xl shadow-xl 
                p-4 sm:p-6 border border-white/50 relative">

  <div className="relative">
    {/* Scroll buttons */}
    {showLeftButton && (
      <button
        onClick={scrollLeft}
        className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 
                   bg-white/80 hover:bg-white rounded-full p-1 sm:p-2 shadow-md"
      >
        <IoIosArrowDropleft className="text-xl sm:text-2xl text-gray-700" />
      </button>
    )}

    {showRightButton && (
      <button
        onClick={scrollRight}
        className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 
                   bg-white/80 hover:bg-white rounded-full p-1 sm:p-2 shadow-md"
      >
        <IoIosArrowDropright className="text-xl sm:text-2xl text-gray-700" />
      </button>
    )}

    {/* Hourly cards */}
    <div
      ref={scrollContainerRef}
      onScroll={() => {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
      }}
      className="overflow-x-auto pb-3 sm:pb-4 no-scrollbar scroll-smooth"
    >
      <div className="flex space-x-3 sm:space-x-4 min-w-max">
        {hourlyData.map((hour, i) => (
          <div key={i}>
            <NavLink
              to="/hourly"
              className="bg-white/40 rounded-xl p-3 sm:p-4 border border-white/70 
                         min-w-[100px] sm:min-w-[120px] flex flex-col items-center hover:bg-white/60 transition"
            >
              <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                {new Date(hour.timestamp_local).getHours()}:00
              </div>
              <img
                src={`https://www.weatherbit.io/static/img/icons/${hour.weather.icon}.png`}
                alt={hour.weather.description}
                className="w-8 h-8 sm:w-10 sm:h-10 mb-1 sm:mb-2"
              />
              <div className="text-base sm:text-lg font-bold text-gray-800">
                {hour.temp}°C
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 text-center">
                {hour.weather.description}
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default HourlySlider;
