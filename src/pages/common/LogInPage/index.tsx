import LoginForm from './components/LoginForm';
import { useState } from 'react';
import ResetPasswordForm from './components/ResetPasswordForm';
import { Box } from '@mui/material';
import signInBackground from '~/assets/images/png/signInBackground.png';

export default function LogInPage() {
  const [resetMode, setResetMode] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${signInBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          '@media (min-width:1025px)': {
            paddingLeft: '60vw',
          },
        }}
      >
        {!resetMode ? (
          <LoginForm setResetMode={setResetMode} />
        ) : (
          <ResetPasswordForm setResetMode={setResetMode} />
        )}
      </Box>
    </Box>
  );
}
