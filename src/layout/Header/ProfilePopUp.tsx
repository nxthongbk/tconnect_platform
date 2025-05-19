import './style.scss';

import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ProfilePopUp = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ cursor: 'pointer' }}>
        <Avatar sx={{ width: 32, height: 32 }} className="avatar" alt="User Avatar" />
      </Box>
    </>
  );
};
export default ProfilePopUp;
