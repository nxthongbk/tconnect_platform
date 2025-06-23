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
          element: <EnergyPage />,
        },
        {
          path: ROUTES.DASHBOARD,
          element: <MasterBoardPage />,
        },
        {
          path: ROUTES.ENERGY,
          element: <EnergyPage />,
        },
        {
          path: ROUTES.STREET_LIGHT,
          element: <StreetLightsPage />,
        },
        {
          path: ROUTES.CCTV,
          element: <CCTVPage />,
        },
        {
          path: ROUTES.TRAFFIC_LIGHT,
          element: <MasterBoardPage />,
        },
				{
					path: ROUTES.FIRE_ALARM,
					element: <FireAlarmPage />,
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
