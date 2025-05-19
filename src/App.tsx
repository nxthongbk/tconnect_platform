import './App.scss';
import IsLogin, { privateRoutes, publicRoutes } from './configs/routes/Routes';

import { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IsLogin />}>
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let LayoutTag;

            if (route.layout) {
              LayoutTag = Layout;
            } else {
              LayoutTag = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutTag>
                    <Page />
                  </LayoutTag>
                }
              />
            );
          })}
        </Route>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let LayoutTag;

          if (route.layout) {
            LayoutTag = Layout;
          } else {
            LayoutTag = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <LayoutTag>
                  <Page />
                </LayoutTag>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
