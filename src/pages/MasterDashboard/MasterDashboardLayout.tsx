import React, { useState } from 'react';
import TopBar from '~/components/TopBar';
import BottomMenu from '~/components/BottomMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTES from '~/constants/routes.constant';
import { menuItems } from '~/constants/menuItems';
import topBarBg from '~/assets/images/png/Topbar.png';
import bottomBar from '~/assets/images/png/Bottombar.png';

const MasterDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [country, setCountry] = useState('US');
  const [time, setTime] = useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="master-dashboard-layout">
      <TopBar
        topBarBg={topBarBg}
        formattedTime={formattedTime}
        formattedDate={formattedDate}
        country={country}
        setCountry={setCountry}
        onTitleClick={() => navigate(ROUTES.DASHBOARD)}
      />
      <div className="dashboard-main-content">
        {children}
      </div>
      <BottomMenu
        activePath={location.pathname}
        items={menuItems}    
        bottomBarBg={bottomBar}
			
      />
    </div>
  );
};

export default MasterDashboardLayout;