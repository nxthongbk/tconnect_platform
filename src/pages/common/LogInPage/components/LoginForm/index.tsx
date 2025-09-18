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
import { Button } from '@mui/material';
import { Network } from '@phosphor-icons/react';

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
        navigate('/dashboard');
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
    <div className="w-full max-w-md mx-auto bg-slate-800 rounded-2xl shadow-2xl p-10 relative">
      <div className="flex flex-col items-center mb-6">
        <Network size={36} className="w-8 h-8 text-teal-400" />
        <h2 className="text-2xl font-bold text-gray-200 mb-1">Login to IoTPlatform</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <InputCustom
          type="text"
          classNameContainer="font-normal text-gray-200"
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
          classNameContainer="font-normal text-gray-200"
          isRequired={true}
          control={control}
          name="password"
          isError={Boolean(errors.password)}
          variant="outlined"
          size="small"
          placeholder={translation('Nhập mật khẩu')}
          helperText={translation(errors.password?.message)}
          isSpacingHelperText={true}
        />
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center text-gray-300 text-sm">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <button
            type="button"
            className="text-teal-500 text-sm hover:underline"
            onClick={() => setResetMode(true)}
          >
            {translation('Quên mật khẩu?')}
          </button>
        </div>
        <Button
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white transition-all duration-300"
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#2563eb',
            color: '#fff',
            fontWeight: 500,
            fontSize: 18,
            borderRadius: 2,
            py: 1.5,
            mt: 1,
            textTransform: 'none',
            boxShadow: 'none',
            transition: 'background 0.3s, transform 0.3s',
          }}
        >
          {loginMutation.isPending ? (
            'Signing in...'
          ) : (
            <span className="flex items-center justify-center">
              <span className="mr-2">Sign in</span>
              <span className="ph ph-sign-in"></span>
            </span>
          )}
        </Button>
      </form>
      <div className="text-center text-sm text-gray-500 mt-4">
        Don't have an account?{' '}
        <a href="#" className="text-teal-500 hover:underline">
          Contact Sales
        </a>
      </div>
    </div>
  );
}
