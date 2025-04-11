import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/" className="flex items-center ">
    <h1 className="text-8xl font-mono mt-8 font-bold">
      Tiny<span className="text-violet-400 ">Short</span>
    </h1>
  </Link>
  )
}

export default Header
