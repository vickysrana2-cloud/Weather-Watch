import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";


const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>

    </div>
  );
};

export default App;
