import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginForm"
import SignupPage from "./pages/Signup"
import AnalyticsPage from "./components/Analytics"
import QRPage from './components/QR'

function App() {

  return (
   <Routes>
      {/* Add routes here */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/analytics/:shortId" element={<AnalyticsPage />} /> 
      <Route path="/qr/:shortId" element={<QRPage />} />
   </Routes>
  )
}

export default App
