// src/components/DisplayRecentAlertsSlider.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayRecentAlertsSlider = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get(
          "https://68ce52d36dc3f350777eaa4a.mockapi.io/users"
        );
        console.log(res);
        setAlerts(res.data.reverse()); // ------------------------- newest first

        // ----------------------------- Each Message will deleted after 24 Hr
        const timeNow = Date.now();
        // console.log(timeNow);


        for (const alert of res.data) {
          // console.log(alert)
          const postTime = new Date(
            alert.timestamp || alert.createdAt
          ).getTime();
          if (timeNow - postTime > 86400000) {
            await axios.delete(
              `https://68ce52d36dc3f350777eaa4a.mockapi.io/users/${alert.id}`
            );
          }
        }
      } catch (err) {
        console.error("Error fetching alerts:", err);
        setError("Unable to fetch alerts at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading recent alerts...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  if (alerts.length === 0) {
    return <p className="text-center mt-10">No alerts available right now.</p>;
  }

  console.log(alerts);

  return (
    <div
      className="w-full max-w-7xl bg-white/40 backdrop-blur-md rounded-xl shadow-xl 
                p-2 sm:p-6 border border-white/50 sm:my-4 my-4"
    >
      {/* ----------------------------------------- Section Title */}
      <h2 className="text-base sm:text-lg font-bold text-left text-red-500 mb-4 sm:mb-6">
        Recent Weather Alerts
      </h2>

      {/* Alerts Slider */}
      <div className="flex overflow-x-auto space-x-3 sm:space-x-4 pb-3 sm:pb-4 scrollbar-hide scroll-smooth">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex-shrink-0 w-56 sm:w-64 p-3 sm:p-4 rounded-xl bg-white/60 
        shadow-md border border-white/50 hover:bg-white/80 transition"
          >
            <h3 className="font-semibold sm:font-bold text-gray-900 mb-1 text-sm sm:text-base">
              {alert.name}
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm line-clamp-3">
              {alert.message}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
              {alert.location} | {new Date(alert.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <p className="text-center text-[10px] sm:text-xs text-gray-600 mt-3 sm:mt-4">
        These alerts are shared by real people to help others stay informed and
        safe.
      </p>
    </div>
  );
};

export default DisplayRecentAlertsSlider;
