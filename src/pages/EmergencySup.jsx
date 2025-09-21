// src/pages/EmergencySup.jsx
import React from "react";

const EmergencySup = () => {
  const emergencyContacts = [
    {
      name: "National Weather Helpline",
      phone: "9-868-126-275",
      description: "24/7 support for severe weather emergencies",
    },
    {
      name: "Local Police",
      phone: "112",
      description: "Report dangerous situations or request assistance",
    },
    {
      name: "Fire & Rescue",
      phone: "101",
      description: "Fire emergencies, flood rescues, or storm damage help",
    },
    {
      name: "Ambulance / Medical Help",
      phone: "102",
      description: "Medical emergencies and injury response",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-200 to-yellow-100 p-6">
      <div className="max-w-2xl w-full bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-6 border border-white/50">
        <h1 className="text-3xl font-bold text-red-700 text-center mb-4">
          🚨 Emergency Support
        </h1>
        <p className="text-center text-gray-700 mb-6">
          In case of extreme weather conditions, use these contacts for help.
        </p>

        <div className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {contact.name}
                </h2>
                <p className="text-sm text-gray-600">{contact.description}</p>
              </div>
              <a
                href={`tel:${contact.phone}`}
                className="mt-2 md:mt-0 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all"
              >
                Call: {contact.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-red-100 border border-red-200 rounded-lg">
          <h3 className="text-lg font-bold text-red-700 mb-2">
            ⚠️ Safety Tips
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Stay indoors during heavy rain, thunderstorms, or strong winds.</li>
            <li>Keep emergency supplies: flashlight, first aid kit, drinking water.</li>
            <li>Charge your mobile devices in case of power outage.</li>
            <li>Follow official weather updates and evacuation orders if given.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencySup;
