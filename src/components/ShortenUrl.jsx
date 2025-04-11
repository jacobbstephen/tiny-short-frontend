import { useState } from "react";
import axios from "axios";
const ShortenUrl = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleShortenURL = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log('Token IN SHORTEN URL = ', token)
    try {
      const response = await axios.post(
        "http://localhost:3000/url/shorten",
        {originalUrl: url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        // console.log(response.data.shortUrl);
        setShortUrl(response.data.shortUrl);
        setShowModal(true);
        setUrl("")

        
      } else {
        console.log("Error response message: ", response.data.message);
      }
    } catch (err) {
      console.log("Error = ", err);
    }
  };



  return (
    <>
    <div className="flex items-center justify-center h-full mt-1  rounded-md ">
      <form
        onSubmit={handleShortenURL}
        className="flex flex-row mt-8 gap-4 h-full "
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL "
          className="block w-80 p-2 mt-2 border border-violet-400 rounded-full"
        />
        <button
          type="submit"
          className="bg-violet-400 text-white px-8 py-2 mt-3 rounded-full font-medium hover:bg-violet-600 transition duration-300"
        >
          ShortenURL
        </button>
      </form>
    </div>

    {showModal && 
      <>
      {/* Blurred Background */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Shortened URL</h2>
          <p className="text-gray-600 mb-4">{shortUrl}</p>
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleCopy}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Copy URL
            </button>
            <button
              onClick={closeModal}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
    }

    </>
  );
};

export default ShortenUrl;
