// Front/src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "../shared/pages/layout/Layout.jsx"
import LandingPage from "../components/Home/LandingPage"
import Loading from "../shared/components/Loading.jsx";
const Login = lazy(() => import("../components/Auth/Login"));
const Register = lazy(() => import("../components/Auth/Register"));

const UserGuestRoutes = lazy(() => import("./UserGuestRoutes.jsx"));
import { UserAdminPrivateRoutes } from "./UserAdminPrivateRoutes.jsx";

import AdminDashboard from "../components/Dashboard/AdminDashboard";
const Muestras = lazy(() => import("../components/muestras"));


const PageNotFound = lazy(() => import("../shared/pages/error/PageNotFound.jsx"));
const DepartureGrid = lazy(() => import("../modules/Departures/components/DepartureGrid.jsx"));
const DepartureFull = lazy(() => import("../modules/Departures/pages/DepartureFull.jsx"));
const Gallery = lazy(() => import("../components/PhotosGallery/Gallery.jsx"));
import { AdminPackages } from "../modules/admin/pages/AdminPackages.jsx";
// import { CreateEditPackage } from "../modules/admin/components/CreateEditPackage.jsx";
import { AdminLayout } from "../modules/admin/layout/AdminLayout.jsx";
import AdminDepartures from "../modules/admin/pages/AdminDepartures.jsx";
import AdminComments from "../modules/admin/pages/AdminComments.jsx";
import Perfil from "../components/Auth/Perfil";
import { CreateEditPackageBasic } from "@/modules/admin/pages/CreateEditPackageBasic.jsx";
import { CreateEditPackageDetails } from "@/modules/admin/pages/CreateEditPackageDetails.jsx";
import { CreateEditPackageDestination } from "@/modules/admin/pages/CreateEditPackageDestination.jsx";
import { CreateEditDepartures } from "@/modules/admin/pages/CreateEditDepartures.jsx";
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
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/admin" element={<UserAdminPrivateRoutes><AdminLayout /></UserAdminPrivateRoutes>}>
            <Route index element={<Navigate to="usuarios" replace />} />
            <Route path="usuarios" element={<AdminDashboard />} />
            <Route path="paquetes" element={<AdminPackages />} />
            <Route path="paquetes/:id" element={<CreateEditPackageBasic />} />
            {/* <Route path="paquetes/nuevo" element={<CreateEditPackage />} /> */}
            <Route path="paquetes/nuevo" element={<CreateEditPackageBasic />} />
            <Route path="paquetes/detalles" element={<CreateEditPackageDetails />} />
            <Route path="paquetes/destinos" element={<CreateEditPackageDestination />} />
            {/* <Route path="paquetes/:id" element={<PackageFullView />} /> */}
            {/* <Route path="paquetes/editar/:id" element={<CreateEditPackage />} /> */}
            <Route path="salidas" element={<AdminDepartures />} />
            <Route path="salidas/nueva" element={<CreateEditDepartures />} />
            <Route path="salidas/:id" element={<CreateEditDepartures />} />
            <Route path="comentarios" element={<AdminComments />} />
          </Route>
        </Route>

        {/* Error and 404 pages without Layout */}
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
