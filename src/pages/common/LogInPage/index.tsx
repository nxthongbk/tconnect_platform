import LoginForm from './components/LoginForm';
import { useState } from 'react';
import ResetPasswordForm from './components/ResetPasswordForm';
import { Box } from '@mui/material';
import signInBackground from '~/assets/images/png/signInBackground.png';
import './style.scss';

export default function LogInPage() {
  const [resetMode, setResetMode] = useState(false);

  return (
    <Box
      className="login-background"
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
        animation: 'fadeInBg 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="bubble-bg">
        <span
          className="bubble"
          style={{ left: '10%', animationDelay: '0s', width: 30, height: 30 }}
        />
        <span
          className="bubble"
          style={{ left: '25%', animationDelay: '2s', width: 25, height: 25 }}
        />
        <span
          className="bubble"
          style={{ left: '40%', animationDelay: '4s', width: 45, height: 45 }}
        />
        <span
          className="bubble"
          style={{ left: '55%', animationDelay: '1s', width: 30, height: 30 }}
        />
        <span
          className="bubble"
          style={{ left: '70%', animationDelay: '3s', width: 40, height: 40 }}
        />
        <span
          className="bubble"
          style={{ left: '85%', animationDelay: '5s', width: 10, height: 10 }}
        />
      </div>
      <Box
        className="login-form"
        sx={{
          '@media (min-width:1025px)': {
            paddingLeft: '60vw',
            animation: 'fadeInUp 1.2s 0.2s cubic-bezier(0.23, 1, 0.32, 1) both',
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
