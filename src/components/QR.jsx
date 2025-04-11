import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const QR = () => {
  const { shortId } = useParams();
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:3000/url/qr/${shortId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          const qrData = response.data.qr; // The array of bytes from the backend
          setQrCode(qrData); // Set the QR code image URL in state
        } else {
          console.log("Error response message: ", response.data.message);
        }
      } catch (err) {
        console.log("Error = ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
  {qrCode ? (
    <img src={qrCode} alt="QR Code" className="w-80 h-80"  />
  ) : (
    <p>Loading QR Code...</p>
  )}
</div>

  );
};

export default QR;
