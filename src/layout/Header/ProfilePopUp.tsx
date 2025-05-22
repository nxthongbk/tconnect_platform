import './style.scss';

import {
  Avatar,
  Box,
} from '@mui/material';

const ProfilePopUp = () => {

  return (
    <>
      <Box sx={{ cursor: 'pointer' }}>
        <Avatar sx={{ width: 32, height: 32 }} className="avatar" alt="User Avatar" />
      </Box>
    </>
  );
};
export default ProfilePopUp;
