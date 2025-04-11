import { useState } from "react";
import axios from "axios";
import Icon from "../../assets/man_icon.svg";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";


const LoginForm =  () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post("http://localhost:3000/user/login", {
        username,
        password,
      });
      if(response.status === 200 || response.status === 201){
        console.log(response.data.message);
        setUsername("");
        setPassword("");
        const token = response.data.token;  
        localStorage.setItem("token", token);
        console.log('Token IN LOGIN = ', token)
        navigate("/home")
        
      }else  {
        console.log("Error response message: ", response.data.message);
      }

    }catch(err){
      console.log("Error = ",err);
    }


  }

  return (
    <div>
      <Header />

      <div className="flex items-center justify-center h-full mt-1  rounded-md ">
        {/* Image */}

        <div>
          <img src={Icon} alt="" className="w-full h-[700px]" />
        </div>

        {/* Form details */}
        <form onSubmit={handleLogin} className="flex flex-col mt-8 gap-4 h-full ">
          <div>
            <label className="font-bold text-xl text-violet-800">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="block w-80 p-2 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="font-bold text-xl text-violet-800">
              Password
            </label>
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
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
