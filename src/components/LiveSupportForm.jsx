
import React, { useState, useContext } from "react";
import axios from "axios";
import { HourlyWeatherContext } from "../context/HourlyWeatherContext";

function LiveSupportForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { city } = useContext(HourlyWeatherContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ---------------------------- Basic validation
    if (!name.trim()) {
      setStatus("Please enter your name");
      setIsLoading(false);
      return;
    }
    if (!message.trim()) {
      setStatus("Please enter an alert message");
      setIsLoading(false);
      return;
    }

    // -------------------------------------- Prepare data
    const alertData = {
      name,
      message,
      timestamp: new Date().toISOString(),
      location: city, 
    };

    try {
      const res = await axios.post(
        "https://68ce52d36dc3f350777eaa4a.mockapi.io/users",
        alertData
      );
      console.log(res);

      if (res.status === 201 || res.status === 200) {
        setStatus("✅ Alert submitted successfully!");
        setSubmittedData(res.data);
        setMessage("");
        setName("");

        // --------------------------- Clear status after 5s
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("❌ Failed to submit alert. Please try again.");
      }
    } catch (error) {
      console.error("Alert submission error:", error);
      setStatus("❌ Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center rounded-t-2xl my-2 p-4 bg-gradient-to-br from-blue-400 to-purple-300">
      <div className="max-w-md w-full bg-white/30 backdrop-blur-md rounded-xl shadow-xl p-6 border border-white/50">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className="text-2xl font-bold text-center text-gray-800">
            Weather Alert Form
          </h3>

          {/* --------------------------- Info Section */}
          <div className="bg-white/40 p-4 rounded-lg">
            <p className="font-medium text-gray-700 mb-2">About Live Alerts:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Report severe weather conditions in real-time</li>
              <li>• Notify others about storms, floods, or extreme conditions</li>
              <li>• Alerts are verified and broadcast to nearby users</li>
              <li>• Include specific location details when possible</li>
              <li>• Only submit genuine emergency warnings</li>
            </ul>
          </div>

          {/* --------------------------- Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 bg-white/50 border border-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
              required
            />
          </div>

          {/* -------------------------- Alert Message Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alert Message *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter urgent weather information (e.g., 'Tornado spotted near downtown at 3:45 PM')..."
              className="w-full h-32 p-3 bg-white/50 border border-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* ------------------- Status */}
          {status && (
            <div
              className={`p-3 rounded-lg text-center font-medium ${
                status.includes("✅")
                  ? "bg-green-200/70 text-green-800"
                  : "bg-red-200/70 text-red-800"
              }`}
            >
              {status}
            </div>
          )}

          {/* --------------------- Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Broadcast Alert"}
          </button>

          {/* --------------------------------- Submitted Alert Preview */}
          {submittedData && (
            <div className="bg-white/40 p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                Alert Details:
              </h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-medium">Name:</span> {submittedData.name}</p>
                <p><span className="font-medium">Message:</span> {submittedData.message}</p>
                <p><span className="font-medium">Location:</span> {submittedData.location}</p>
                <p><span className="font-medium">Time:</span> {new Date(submittedData.timestamp).toLocaleString()}</p>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-600 text-center">
            Alerts are monitored and verified by our weather team. False reports
            may lead to account restrictions.
          </p>
        </form>
      </div>
    </div>
  );
}

export default LiveSupportForm;
