import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

import HomePage from '../../pages/Home';
import MapboxPage from '../../pages/MapboxPage';

const routes = {
  home: '/',
  login: '/login',
  setting: '/setting',
  overview: '/overview',
  mapbox: '/monitoring',

  notFound: '*',
};

export const privateRoutes = [
  { path: routes.home, component: HomePage, layout: true },
  { path: routes.mapbox, component: MapboxPage, layout: true },
];

export const publicRoutes = [{ path: routes.home, component: HomePage, layout: false }];

const IsLogin = () => {
  const token = Cookies.get('token');
  return <Outlet />; //: <Navigate to="/" />;
};

export default IsLogin;
