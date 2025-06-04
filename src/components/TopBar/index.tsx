import React from 'react';
import { Avatar } from '@mui/material';
import './style.scss';

interface TopBarProps {
  topBarBg: string;
  formattedTime: string;
  formattedDate: string;
  country: string;
  setCountry: (country: string) => void;
  onTitleClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  topBarBg,
  formattedTime,
  formattedDate,
  country,
  setCountry,
  onTitleClick,
}) => (
  <div className="top-bar-wrapper">
    <img src={topBarBg} alt="Top Bar" className="top-bar" />
    <div className="top-bar-content">
      <div className="top-bar-left">
        <div className="top-bar-time">{formattedTime}</div>
        <div className="top-bar-date">{formattedDate}</div>
      </div>
      <div className="top-bar-title" style={{ cursor: 'pointer' }} onClick={onTitleClick}>
        Master Dashboard
      </div>
      <div className="top-bar-controls">
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="country-select"
        >
          <option value="US">USA</option>
          <option value="VN">Vietnam</option>
          <option value="JP">Japan</option>
        </select>
        <Avatar sx={{ width: 25, height: 25 }} alt="User Avatar" />
      </div>
    </div>
  </div>
);

export default TopBar;
