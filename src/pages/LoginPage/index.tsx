import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Paper,
} from '@mui/material';
// import { Visibility, VisibilityOff } from "@mui/icons-material";

import bg1 from '../../assets/images/png/bg_login_layer_1.png';
import bg2 from '../../assets/images/png/bg_login_layer_2.png';
import bg3 from '../../assets/images/png/bg_login_layer_3.png';
import bg4 from '../../assets/images/png/bg_login_layer_4.png';
import loginBg from '../../assets/images/png/container.png';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        background: '#0c1126',
        display: 'flex',
      }}
    >
      {/* Full-page background image */}
      <img
        src={bg1}
        alt=""
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '90vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <img
        src={bg2}
        alt=""
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '80vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <img
        src={bg3}
        alt=""
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* All other content */}
      {/* Left: Cityscape Illustration */}
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flex: 1 }}>
        <Box
          sx={{
            flex: 2,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 0,
          }}
        >
          {/* <img
          src={bg1}
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        /> */}
          {/* <img
          src={bg2}
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            top: 10,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        /> */}

          <img
            src={bg4}
            alt=""
            style={{
              position: 'absolute',
              left: 240,
              top: 10,
              width: '60%',
              height: '90%',
              objectFit: 'cover',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />
        </Box>
      </Box>
      <div
        style={{
          // flex: 1,
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center',
          // minWidth: 0,
          // padding: '2rem',
          // paddingLeft: '140px',
          height: '100vh',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: '5vw',
          position: 'relative',
        }}
      >
        {/* Login form goes here */}

        <Box
          sx={{
            position: 'relative',
            width: 480,
            minHeight: 512,
            px: 5,
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',

            overflow: 'hidden',
          }}
        >
          {/* Absolutely positioned background image */}
          <img
            src={loginBg}
            alt=""
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <Paper sx={{ padding: 4, width: '300px' }}>
            <Typography
              variant="h4"
              sx={{
                color: '#fff',
                fontWeight: 700,
                mb: 4,
                textAlign: 'center',
                letterSpacing: 1,
                fontFamily: 'Montserrat, monospace',
                fontSize: 32,
              }}
            >
              Sign in
            </Typography>
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              sx={{
                mb: 3,
                input: { color: '#fff' },
                label: { color: '#abadb0' },
                bgcolor: '#232b3e',
                borderRadius: 1,
              }}
              InputLabelProps={{ style: { color: '#abadb0' } }}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="filled"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              sx={{
                mb: 2,
                input: { color: '#fff' },
                label: { color: '#abadb0' },
                bgcolor: '#232b3e',
                borderRadius: 1,
              }}
              InputLabelProps={{ style: { color: '#abadb0' } }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(show => !show)}
                      edge="end"
                      sx={{ color: '#abadb0' }}
                    >
                      {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Link href="#" underline="hover" sx={{ color: '#0BA5EC', fontSize: 14 }}>
                Forgot password?
              </Link>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#0794ff',
                color: '#fff',
                fontWeight: 600,
                fontSize: 18,
                borderRadius: 0,
                py: 1.5,
                textTransform: 'none',
                boxShadow: 'none',
                position: 'relative',
                mt: 2,
                // Custom cut corners for button
                clipPath:
                  'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                '&:hover': { bgcolor: '#007fe0' },
              }}
            >
              Sign in
            </Button>
          </Paper>
        </Box>
      </div>
    </Box>
  );
};

export default LoginPage;
