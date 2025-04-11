import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Analytics = () => {
  const { shortId } = useParams();
  const [urlAnalytics, setURLAnalytics] = useState(null);
  const [mostAccessedLocation, setMostAccessedLocation] = useState("");
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://tiny-short-backend-production.up.railway.app/url/analytics/${shortId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          const data = response.data;
          setURLAnalytics(data);

          // Process device types
          const deviceCounts = {};
          data.timestamp.forEach((entry) => {
            deviceCounts[entry.device] = (deviceCounts[entry.device] || 0) + 1;
          });
          const mostUsedDevice = Object.keys(deviceCounts).reduce((a, b) =>
            deviceCounts[a] > deviceCounts[b] ? a : b
          );
          setDeviceType(mostUsedDevice);

          // Process locations
          const locationCounts = {};
          data.timestamp.forEach((entry) => {
            const locationKey = `${entry.location.city}, ${entry.location.region}, ${entry.location.country}`;
            locationCounts[locationKey] = (locationCounts[locationKey] || 0) + 1;
          });
          const mostUsedLocation = Object.keys(locationCounts).reduce((a, b) =>
            locationCounts[a] > locationCounts[b] ? a : b
          );
          setMostAccessedLocation(mostUsedLocation);
        } else {
          console.log("Error response message: ", response.data.message);
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchData();
  }, [shortId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      {urlAnalytics ? (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Analytics for <span className="text-blue-600">https://tiny-short-backend-production.up.railway.app/url/{shortId}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Click Count */}
            <div className="bg-gray-50 border rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Click Count
              </h3>
              <p className="text-4xl font-bold text-gray-800">
                {urlAnalytics.clickCount || "N/A"}
              </p>
            </div>
            {/* Card 2: Most Accessed Location */}
            <div className="bg-gray-50 border rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Most Accessed Location
              </h3>
              <p className="text-xl font-bold text-gray-800">
                {mostAccessedLocation || "N/A"}
              </p>
            </div>
            {/* Card 3: Device Type */}
            <div className="bg-gray-50 border rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Device Type
              </h3>
              <p className="text-xl font-bold text-gray-800">
                {deviceType || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-xl">Loading analytics...</p>
      )}
    </div>
  );
};

export default Analytics;
