import { Link } from "react-router-dom";


const HeroSection = () => {
    return (
        <div className=" mt-36 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-8xl font-extrabold text-gray-900 mb-6">
              Simplify Your <span className="text-violet-400">URL</span> Tracking and Analytics
            </h1>
            {/* Subheading */}
            <p className="text-gray-500 text-lg mb-8">
              Manage, track, and analyze your URLs seamlessly with our easy-to-use platform. Boost your insights and streamline your workflows.
            </p>
            {/* Buttons */}
            <div className="flex justify-center space-x-4">
              

              <Link to="/signup" className="bg-violet-400 text-white px-8 py-3 rounded-full font-medium hover:bg-violet-600 transition duration-300">Get Started</Link>
             
            </div>
          </div>
        </div>
      );
}

export default HeroSection;
