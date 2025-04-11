import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="flex  mt-5 ml-2 gap-10 justify-between items-center">
       
        <Link to="/" className="flex items-center gap-2">
        <h1 className="text-7xl font-mono mt-2 font-bold">Tiny<span className="text-violet-400 ">Short</span></h1>
        </Link>
        <div className="flex gap-14  mr-14 mt-2">
          <Link to="/login" className="px-8 py-2 rounded-full font-mono text-white  text-center text-2xl bg-violet-400 font-semibold">Login</Link>
          <Link to="/signup" className="px-8 py-2 rounded-full font-mono text-white bg-violet-400  text-center text-2xl  font-semibold">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
