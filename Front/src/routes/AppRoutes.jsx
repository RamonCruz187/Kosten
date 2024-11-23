import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "../shared/pages/layout/Layout.jsx"
import LandingPage from "../components/Home/LandingPage"
import Loading from "../shared/components/Loading.jsx";
const Login = lazy(() => import("../components/Auth/Login"));
const Register = lazy(() => import("../components/Auth/Register"));
// const AdminDashboard = lazy(() => import("../components/Dashboard/AdminDashboard"));
import AdminDashboard from "../components/Dashboard/AdminDashboard";
const Muestras = lazy(() => import("../components/muestras"));
const UserGuestRoutes = lazy(() => import("./UserGuestRoutes.jsx"));
const AdminPackages = lazy(() => import("../modules/admin/pages/AdminPackages.jsx"));
const PageNotFound = lazy(() => import("../shared/pages/error/PageNotFound.jsx"));
const CreateEditPackage = lazy(() => import("../modules/admin/components/CreateEditPackage.jsx"));
const DepartureGrid = lazy(() => import("../modules/Departures/components/DepartureGrid.jsx"));
const DepartureFull = lazy(() => import("../modules/Departures/pages/DepartureFull.jsx"));
const PackageFullView = lazy(() => import("../modules/admin/pages/PackageFullView.jsx"));
const Gallery = lazy(() => import("../components/PhotosGallery/Gallery.jsx"));
// const UserAdminPrivateRoutes = lazy(() => import("./UserAdminPrivateRoutes.jsx"));
import { UserAdminPrivateRoutes } from "./UserAdminPrivateRoutes.jsx";
const About = lazy(() => import("../components/Home/About"));
const TourDestinationView = lazy(() => import("../components/TourDestination/TourDestinationView.jsx"));
const TourDestinationDetail = lazy(() => import("../components/TourDestination/TourDestinationDetail.jsx"));
const ContactView = lazy(() => import("../components/Contact/ContactView.jsx"));

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Routes with Layout */}
        <Route element={<Layout></Layout>}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<UserGuestRoutes><Login /></UserGuestRoutes>} />
          <Route path="/register" element={<UserGuestRoutes><Register /></UserGuestRoutes>} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/muestras" element={<Muestras />} />
          <Route path="/salidas" element={<DepartureGrid />} />
          <Route path="/about" element={<About />} />
          <Route path="/salidas/:id" element={<DepartureFull />} />
          <Route path="/destinos" element={<TourDestinationView />} />
          <Route path="/destinos/:id" element={<TourDestinationDetail />} />
          <Route path="/contacto" element={<ContactView />} />
        </Route>
          <Route path="/admin" element={<UserAdminPrivateRoutes />}>
            <Route index element={<Navigate to="usuarios" replace />} />
            <Route path="usuarios" element={<AdminDashboard />} />
            <Route path="paquetes" element={<AdminPackages />} />
            <Route path="paquetes/:id" element={<PackageFullView />} />
            <Route path="paquetes/nuevo" element={<CreateEditPackage />} />
            <Route path="paquetes/editar/:id" element={<CreateEditPackage />} />
          </Route>

        {/* Error and 404 pages without Layout */}
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
