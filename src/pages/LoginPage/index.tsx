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

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import authService from '../../services/auth.service';
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';

import signInBackground from '../../assets/images/png/signInBackground.png';
import signInFrame from '../../assets/images/png/signInFrame.png';
import { Eye, EyeSlash } from '@phosphor-icons/react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <img
            src={signInFrame}
            alt=""
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          <Paper
            sx={{
              zIndex: 3,
              position: 'relative',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              backdropFilter: 'blur(8px)',
              padding: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#fff',
                fontWeight: 400,
                mb: 8,
                textAlign: 'center',
                letterSpacing: 1,
                fontSize: { xs: 28, sm: 32 },
              }}
            >
              Sign in
            </Typography>

            <TextField
              placeholder="Nhập email"
              label="Email"
              variant="outlined"
              fullWidth
              sx={{
                mb: 6,
                '& .MuiInputBase-root': {
                  bgcolor: '#232b3e',
                  borderRadius: 2,
                  color: '#fff',
                },
                '& .MuiInputLabel-root': {
                  color: '#abadb0',
                  fontSize: 20,
                  top: '-20px',
                  left: '-10px',
                  background: 'transparent',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                  fontSize: 16,
                  py: 1.5,
                },
              }}
              InputLabelProps={{ shrink: true }}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              placeholder="Nhập password"
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              sx={{
                mb: 1,
                '& .MuiInputBase-root': {
                  bgcolor: '#232b3e',
                  borderRadius: 2,
                  color: '#fff',
                },
                '& .MuiInputLabel-root': {
                  color: '#abadb0',
                  fontSize: 20,
                  top: '-20px',
                  left: '-10px',
                  background: 'transparent',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiInputBase-input': {
                  color: '#fff',
                  fontSize: 16,
                  py: 1.5,
                },
              }}
              InputLabelProps={{ shrink: true }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <span
                    onClick={() => {
                      setShowPassword(prev => !prev);
                    }}
                    style={{
                      cursor: 'pointer',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingTop: '4px',
                    }}
                  >
                    {!showPassword ? (
                      <EyeSlash size={20} color="var(--text-tertiary)" />
                    ) : (
                      <Eye size={20} color="var(--text-tertiary)" />
                    )}
                  </span>
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
                fontWeight: 400,
                fontSize: 18,
                borderRadius: 0,
                py: 1,
                mt: 1,
                textTransform: 'none',
                boxShadow: 'none',
                clipPath:
                  'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                '&:hover': { bgcolor: '#007fe0' },
              }}
            >
              Sign in
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
