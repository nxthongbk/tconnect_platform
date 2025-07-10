import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { AppContext } from '~/contexts/app.context';
import NotFoundPage from '~/pages/common/404Page';
import ROUTES from '~/constants/routes.constant';
import { useContext } from 'react';
import LogInPage from '~/pages/common/LogInPage';
import EnergyMain from '~/pages/EnergyPlatform';
import DashboardPage from '~/pages/EnergyPlatform/DashBoardPage';
import DevicesPage from '~/pages/EnergyPlatform/DevicesPage';
import AnalyticPage from '~/pages/EnergyPlatform/AnalyticPage';
import RecommendationsPage from '~/pages/EnergyPlatform/RecommendationsPage';
import CostsPage from '~/pages/EnergyPlatform/CostsPage';

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
              element: <Navigate to="dashboard" replace />,
            },
            {
              path: 'dashboard',
              element: <DashboardPage />,
            },
            {
              path: 'devices',
              element: <DevicesPage />,
            },
            {
              path: 'analytics',
              element: <AnalyticPage />,
            },
            {
              path: 'recommendations',
              element: <RecommendationsPage />,
            },
            {
              path: 'costs',
              element: <CostsPage />,
            },
            // {
            //   path: 'environmental',
            //   element: <EnvironmentalPage />,
            // },
          ],
        },

        {
          path: '/',
          element: <Navigate to="/dashboard" replace />,
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
