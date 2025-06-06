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
  bottomBarBg?: string;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ items, onMenuClick, activePath, bottomBarBg }) => (
  <div style={{ position: 'relative' }}>
    <ul className="bottom-menu">
      {items.map(item => {
        const isActive = item.path === (activePath || 'energy');
        return (
          <li
            key={item.label}
            className={isActive ? 'active' : ''}
            onClick={item.path ? () => onMenuClick(item.path) : undefined}
            style={item.path ? { cursor: 'pointer' } : {}}
          >
            {item.label}
            {isActive && <span className="bottom-menu-glow" />}
          </li>
        );
      })}
    </ul>
    <img
      src={bottomBarBg}
      alt="Bottom Bar"
      className="bottom-bar"
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100vw',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    />
  </div>
);

export default BottomMenu;
