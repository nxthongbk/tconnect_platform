import { Outlet, createBrowserRouter } from 'react-router-dom';
import { AppContext } from '~/contexts/app.context';
import NotFoundPage from '~/pages/common/404Page';
import ROUTES from '~/constants/routes.constant';
import { useContext } from 'react';
import LogInPage from '~/pages/common/LogInPage';
import MasterBoardPage from '~/pages/MasterDashboard/DashboardPage';
import EnergyPage from '~/pages/MasterDashboard/EnergyPage';
import StreetLightsPage from '~/pages/MasterDashboard/StreetLightsPage';
import CCTVPage from '~/pages/MasterDashboard/CCTVPage';
import FireAlarmPage from '~/pages/MasterDashboard/FireAlarmPage';
import SafetyPage from '~/pages/MasterDashboard/SafetyPage';
import WaterMeterMonitoringPage from '~/pages/MasterDashboard/WaterMeterPage';
import LocationDashboardPage from '~/pages/MasterDashboard/EnergyPage/components/LocationItemDashboard';
import EnergyMain from '~/pages/EnergyPlatform';
import DashboardPage from '~/pages/EnergyPlatform/DashBoardPage';

const Guard = () => {
  const { isAuthenticated } = useContext(AppContext);

  return isAuthenticated ? <Outlet /> : <LogInPage />;
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
      path: '',
      element: <Guard />,
      children: [
        {
          path: ROUTES.HOME,
          element: <EnergyMain />,
          children: [
            {
              path: '',
              element: <DashboardPage />,
            },
          ],
        },
        {
          path: 'energy-flatform',
          element: <EnergyMain />,
          children: [
            {
              path: '',
              element: <DashboardPage />,
            },
          ],
        },
      ],
    },
    // {
    //   path: '/login',
    //   element: <AuthLayout />,
    // },
    {
      path: '/login',
      element: <LogInPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
  return routesElement;
};

export default useRoutes;
