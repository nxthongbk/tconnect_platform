import * as yup from 'yup';

import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { translation, translationCapitalFirst } from '~/utils/translate';
import { AppContext } from '~/contexts/app.context';
import InputCustom from '~/components/InputCustom';
import authService from '~/services/auth.service';
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography, Paper } from '@mui/material';

import signInFrame from '~/assets/images/png/signInFrame.png';
import '../../style.scss';

interface IFormInput {
  username: string;
  password: string;
}

interface IProps {
  setResetMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ setResetMode }: IProps) {
  const loginSchema = yup.object({
    username: yup
      .string()
      .required(translationCapitalFirst('field-is-required-user-name'))
      .max(20, translationCapitalFirst('user-name-must-4-20-character'))
      .min(4, translationCapitalFirst('user-name-must-4-20-character'))
      .matches(
        /^[A-Za-z0-9]+$/,
        translationCapitalFirst('username-must-contain-only-letters-and-numbers')
      ),
    password: yup
      .string()
      .required(translationCapitalFirst('field-is-required-password'))
      .max(50, translationCapitalFirst('password-length-upper-bound-exceed'))
      .min(8, translationCapitalFirst('password-length-lower-bound-exceed')),
  });
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  const loginMutation = useMutation({
    mutationFn: (body: { username: string; password: string }) => {
      return authService.login(body);
    },
  });
  const { setAuthenticated, setUserInfo } = useContext(AppContext);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    loginMutation.mutate(data, {
      onSuccess: res => {
        setAuthenticated(true);
        setUserInfo(res?.data?.userInfo);
        navigate('/');
      },
      onError: (err: any) => {
        setError('username', { message: err?.response?.data?.data });
        setError('password', { message: err?.response?.data?.data });
      },
    });
  };

  const onInvalid = (errors: FieldErrors<IFormInput>) => {
    if (errors.password) {
      setValue('password', '');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: 480,
        minHeight: 512,
        px: 4,
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'visible',
        zIndex: 11,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        background: 'transparent',
      }}
    >
      <img
        className="login-img"
        src={signInFrame}
        alt=""
        style={{
          background: 'transparent',
          backgroundColor: 'transparent',
          backgroundSize: 'cover',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
      <Paper
        className="login-form text-white"
        sx={{
          zIndex: 10,
          backgroundColor: 'transparent',
          boxShadow: 'none',
          padding: 2,
          position: 'relative',
          background: 'transparent',
        }}
      >
        <Typography
          className="login-title"
          variant="h4"
          sx={{
            color: '#fff',
            fontWeight: 600,
            mb: 8,
            textAlign: 'center',
            letterSpacing: 1,
            fontSize: { xs: 28, sm: 32 },
          }}
        >
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} style={{ width: '100%' }}>
          <InputCustom
            type="text"
            classNameContainer="text-white font-normal"
            label={translation('Tên đăng nhập')}
            isRequired={true}
            control={control}
            name="username"
            isError={Boolean(errors.username)}
            variant="outlined"
            size="small"
            placeholder={translation('Nhập tên đăng nhập')}
            helperText={translation(errors.username?.message)}
            isSpacingHelperText={true}
          />
          <InputCustom
            type="password"
            label={translation('Mật khẩu')}
            classNameContainer="text-white font-normal"
            isRequired={true}
            control={control}
            name="password"
            isError={Boolean(errors.password)}
            variant="outlined"
            size="small"
            placeholder={translation('Nhập mật khẩu')}
            helperText={translation(errors.username?.message)}
            isSpacingHelperText={true}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Typography
              variant="button3"
              sx={{ color: '#0BA5EC', fontSize: 14, cursor: 'pointer' }}
              onClick={() => setResetMode(true)}
            >
              {translation('Quên mật khẩu?')}
            </Typography>
          </Box>
          <Button
            className="login-btn"
            type="submit"
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
              transition: 'background 0.3s, transform 0.3s',
            }}
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
