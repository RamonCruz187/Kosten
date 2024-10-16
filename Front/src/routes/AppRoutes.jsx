import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import LandingPage from '../components/Home/LandingPage';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import Muestras from '../components/muestras';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/muestras" element={<Muestras />} />
    </Routes>
  </Router>
);

export default AppRoutes;