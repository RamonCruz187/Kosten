import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import LandingPage from '../components/Home/LandingPage';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import Muestras from '../components/muestras';
import {PackageFull} from "../modules/package/pages/PackageFull.jsx";
import {PackageView} from "../modules/package/pages/PackageView.jsx";
import {UserGuestRoutes} from "./UserGuestRoutes.jsx";
import {UserPrivateRoutes} from "./UserPrivateRoutes.jsx";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />

        <Route
            path="/"
            element={<UserGuestRoutes />}
        >
            <Route path="/login" element={<Login />} />,
            <Route path="/register" element={<Register />} />
        </Route>

        <Route
            path="/"
            element={<UserPrivateRoutes />}
        >
            <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      {/*<Route path="/admin" element={<AdminDashboard />} />*/}

      <Route path="/muestras" element={<Muestras />} />
        <Route path="/salidas" element={<PackageView />} />
        <Route path="/paquetes/:id" element={<PackageFull />} />
    </Routes>
  </Router>
);

export default AppRoutes;