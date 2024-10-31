import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import LandingPage from "../components/Home/LandingPage";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import Muestras from "../components/muestras";
import { UserGuestRoutes } from "./UserGuestRoutes.jsx";
import { AdminPackages } from "../modules/admin/pages/AdminPackages.jsx";
import PageNotFound from "../shared/pages/error/PageNotFound.jsx";
import { CreateEditPackage } from "../modules/admin/components/CreateEditPackage.jsx";
import { DepartureView } from "../modules/Departures/pages/DepartureView.jsx";
import { DepartureFull } from "../modules/Departures/pages/DepartureFull.jsx";
import { PackageFullView } from "../modules/admin/pages/PackageFullView.jsx";

import { Gallery } from "../components/PhotosGallery/Gallery.jsx";

import { UserAdminPrivateRoutes } from "./UserAdminPrivateRoutes.jsx";
import About from "../components/Home/About";
import TourDestinationFull from "../components/TourDestination/TourDestinationFull.jsx";
import TourDestinationDetail from "../components/TourDestination/TourDestinationDetail.jsx";
import ContactView from "../components/Contact/ContactView.jsx";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/" element={<UserGuestRoutes />}>
        <Route path="/login" element={<Login />} />,
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/gallery" element={<Gallery />} />

      <Route path="/muestras" element={<Muestras />} />
      <Route path="/salidas" element={<DepartureView />} />
      <Route path="/about" element={<About />} />
      <Route path="/salidas/:id" element={<DepartureFull />} />
      <Route path="/destinos" element={<TourDestinationFull />} />
      <Route path="/destinos/:id" element={<TourDestinationDetail />} />
      <Route path="/contacto" element={<ContactView />} />

      <Route path="/admin" element={<UserAdminPrivateRoutes />}>
        <Route index element={<Navigate to="usuarios" replace />} />
        <Route path="usuarios" element={<AdminDashboard />} />
        <Route path="paquetes" element={<AdminPackages />} />
        <Route path="paquetes/:id" element={<PackageFullView />} />
        <Route path="paquetes/nuevo" element={<CreateEditPackage />} />
        <Route path="paquetes/editar/:id" element={<CreateEditPackage />} />
      </Route>

      <Route path="/404" element={<PageNotFound />} />

      {/*Not found or error*/}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
