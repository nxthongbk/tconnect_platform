import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { AppContext } from '~/contexts/app.context';
import NotFoundPage from '~/pages/common/404Page';
import { useContext } from 'react';
import LogInPage from '~/pages/common/LogInPage';
import CMMSMain from '~/pages/CMMS';
import SCMMSLandingPage from '~/pages/common/ScmmsLandingPage/Index';
import Dashboard from '~/pages/sCMMS/dashboard/Dashboard';
import EquipmentList from '~/pages/sCMMS/equipment/EquipmentList';
import MaintenanceList from '~/pages/sCMMS/maintenance/MaintenanceList';
import Reports from '~/pages/sCMMS/reports/Reports';
import InventoryList from '~/pages/sCMMS/inventory/InventoryList';
import Settings from '~/pages/sCMMS/settings/Settings';
import UserManagement from '~/pages/sCMMS/users/UserManagement';

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
      element: <SCMMSLandingPage />,
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
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'equipments', element: <EquipmentList /> },
            { path: 'maintenance', element: <MaintenanceList /> },
            { path: 'inventory', element: <InventoryList /> },
            { path: 'reports', element: <Reports /> },
            { path: 'employees', element: <UserManagement /> },
            { path: 'settings', element: <Settings /> },

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
