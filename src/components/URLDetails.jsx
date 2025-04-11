import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

const URLDetails = () => {
  const [urlDetails, setUrlDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      
      try {
        const response = await axios.get(
          "http://localhost:3000/url/getUrlDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          setUrlDetails(response.data.urlDetails);
          console.log(response.data.urlDetails)
        } else if (response.status === 202) {
          setUrlDetails([])
        }else {
          console.log("Error response message: ", response.data.message);
        }
      } catch (err) {
        console.log("Error = ", err);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId); // used to unmount
  }, []);

  const handleQRCode = (shortId) => {
    // Handle QR Code generation logic
    navigate(`/qr/${shortId}`); 
  };

  const handleAnalytics = (shortId) => {
    // Handle Analytics button click
    
    navigate(`/analytics/${shortId}`);    
  };

  return (


    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <table className="w-full text-sm text-left rtl:text-right text-violet-500 rounded-3xl">
        <thead className="text-xl font-mono  text-white uppercase bg-black">
          <tr>
            <th scope="col" className="px-6 py-3">Long URL</th>
            <th scope="col" className="px-6 py-3">Short URL</th>
            <th scope="col" className="px-6 py-3">QR Code</th>
            <th scope="col" className="px-6 py-3">Analytics</th>
          </tr>
        </thead>
        <tbody>
          {urlDetails.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-violet-600">
                No URLs found
              </td>
            </tr>
          ) : (
            urlDetails.map((urlDetail) => (
              <tr
                key={urlDetail._id}
                className="bg-violet-50 border-b dark:bg-violet-100 hover:bg-violet-200"
              >
                <td className="px-6 py-4 font-medium text-violet-900 dark:text-black">
                  {urlDetail.redirectURL}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`http://localhost:3000/url/${urlDetail.shortId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black font-bold hover:underline"
                  >
                    {`http://localhost:3000/url/${urlDetail.shortId}`}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleQRCode(urlDetail.shortId)}
                    className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-600"
                  >
                    Generate QR
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleAnalytics(urlDetail.shortId)}
                    className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
                  >
                    View Analytics
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default URLDetails;
