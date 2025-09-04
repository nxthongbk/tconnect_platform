import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { AppContext } from '~/contexts/app.context';
import NotFoundPage from '~/pages/common/404Page';
import { useContext } from 'react';
import LogInPage from '~/pages/common/LogInPage';
import MesLandingPage from '~/pages/common/MesLandingPage/Index';
import CMMSMain from '~/pages/CMMS';
import DashboardPage from '~/pages/CMMS/DashboardPage/Dashboard';
import DevicesManagement from '~/pages/CMMS/DevicesPage/DevicesManagement';
import MaintenanceManagement from '~/pages/CMMS/MaintenancePage/MaintenanceManagement';
import InventoryManagement from '~/pages/CMMS/InventoryPage/InventoryManagement';
import Report from '~/pages/CMMS/ReportPage/Report';

const Guard = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// const CheckRoleSYSAdmin = () => {
//   const { userInfo } = useContext(AppContext);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const tenantCode = searchParams.get('tenantCode');
//   return userInfo?.roles?.[0] !== 'SYSADMIN' ||
//     (userInfo?.roles?.[0] === 'SYSADMIN' && tenantCode) ? (
//     <ControlCenterPage />
//   ) : (
//     <Navigate to={ROUTES.CUSTOMER_MANAGEMENT} />
//   );
// };

const useRoutes = () => {
  const routesElement = createBrowserRouter([
    {
      path: '/',
      element: <MesLandingPage />,
    },
    {
      path: '/login',
      element: <LogInPage />,
    },
    {
      path: '',
      element: <Guard />,
      children: [
        {
          path: '',
          element: <CMMSMain />,
          children: [
            { path: '', element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'devices', element: <DevicesManagement /> },
            { path: 'maintenance', element: <MaintenanceManagement /> },
            { path: 'inventory', element: <InventoryManagement /> },
            { path: 'reports', element: <Report /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
  return routesElement;
};

export default useRoutes;
