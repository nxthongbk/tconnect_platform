import React from 'react';
import './style.scss';

interface MenuItem {
  label: string;
  path?: string;
}

interface BottomMenuProps {
  items: MenuItem[];
  onMenuClick: (path?: string) => void;
  activePath?: string;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ items, onMenuClick, activePath }) => (
  <ul className="bottom-menu">
    {items.map(item => (
      <li
        key={item.label}
        className={item.path === (activePath || 'energy') ? 'active' : ''}
        onClick={item.path ? () => onMenuClick(item.path) : undefined}
        style={item.path ? { cursor: 'pointer' } : {}}
      >
        {item.label}
        {/* {item.path === (activePath || 'energy') && <img src={activeTabImg} alt="" className="active-tab-img" />} */}
      </li>
    ))}
  </ul>
);

export default BottomMenu;
