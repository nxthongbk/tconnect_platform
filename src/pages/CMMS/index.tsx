import './style.scss';
import { Outlet } from 'react-router-dom';
import Sidebar from '~/components/SidebarMenu/Sidebar';


const CMMSMain = () => {
  return (
    <div className="cmms-main h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CMMSMain;
