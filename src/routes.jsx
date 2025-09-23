import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import CurrWeather from "./pages/CurrWeather";
import DailyForcast from "./pages/DailyForcast";
import HourlyForcast from "./pages/HourlyForcast";
import LiveSupportForm from "./components/LiveSupportForm";
import EmergencySup from "./pages/EmergencySup";
import HourlySlider from "./components/HourlySlider";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <CurrWeather /> }, // -------- Home page
      { path: "daily", element: <DailyForcast /> },
      { path: "hourly", element: <HourlyForcast /> },
      { path: "hourly-slider", element: <HourlySlider /> },
      { path: "liveReport", element: <LiveSupportForm /> },
      { path: "emergencysup", element: <EmergencySup /> },
    ],
  },
]);

export default routes;
