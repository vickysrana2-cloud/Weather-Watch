// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

// ✅ Updated imports after refactor
import { DailyWeatherProvider } from "./context/DailyWeatherContext";
import { HourlyWeatherProvider } from "./context/HourlyWeatherContext";
import routes from "./routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ✅ Wrap entire app with both context providers */}
    <DailyWeatherProvider>
      <HourlyWeatherProvider>
        {/* ✅ RouterProvider now handles all pages */}
        <RouterProvider router={routes} />
      </HourlyWeatherProvider>
    </DailyWeatherProvider>
  </StrictMode>
);
