import { useState } from "react";
import Icon from "../../assets/man_icon.svg";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("IN Handle");

    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        username,
        password,
      });
      console.log("Response Status: ", response.status); 

      if (response.status === 201) {
        console.log(response.data.message);
        setUsername("");
        setPassword("");

        navigate("/login");
      } else  {
        console.log("Error response message: ", response.data.message);
      }
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  return (
    <div>
      <Header />

      <div className="flex items-center justify-center h-full mt-1 rounded-md">
        {/* Image */}
        <div>
          <img src={Icon} alt="" className="w-full h-[700px]" />
        </div>
        
        {/* Form details */}
        <form onSubmit={handleSignUp} className="flex flex-col mt-8 gap-4 h-full">
          <div>
            <label className="font-bold text-xl text-violet-800">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="block w-80 p-2 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="font-bold text-xl text-violet-800">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="block w-80 p-2 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-violet-400 text-white px-8 py-2 mt-3 rounded-full font-medium hover:bg-violet-600 transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
