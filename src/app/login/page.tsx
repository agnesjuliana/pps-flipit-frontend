'use client';

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */

import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { LoginUserType } from '../api/Auth';
import { LoginUserSchema } from '../api/Auth';
import login from '../api/Auth/action';
import { useLogin } from '../api/Auth/services';
import { FormInputText } from '@/lib/components/FormTextInput';

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isError, error: errMessage, isPending } = useLogin();
  const router = useRouter();
  const { handleSubmit, control } = useForm<LoginUserType>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      password: '',
      email: '',
    },
    mode: 'onChange',
  });

  const onError = (error: FieldErrors<LoginUserType>) => {
    console.log(error);
    return error;
  };

  const onSubmit = async (data: LoginUserType) => {
    try {
      const loginData = await login(data);
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('user', JSON.stringify(loginData));
      router.push('/app/home');
    } catch (e) {
      console.log(e, 'error');
    }
  };
  return (
    <div className="absolute bottom-0 w-full rounded-t-[32px] bg-white px-[21px] py-10 md:relative md:mx-auto md:my-20 md:max-w-md md:rounded-2xl md:shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-[6px]">
          <p className="text-2xl font-bold leading-8">Masuk</p>
          <p className="text-sm font-light leading-5">
            Masuk dan nikmati perjalanan belajar yang menyenangkan!
          </p>
        </div>
        <Stack justifyContent="space-between" alignItems="left" spacing="20px">
          <form
            className="flex w-[100%] flex-col gap-5"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <FormInputText name="email" control={control} label="Email" />
            <FormInputText
              type={showPassword ? 'text' : 'password'}
              name="password"
              control={control}
              label="Kata Sandi"
              addonRight={() => (
                <button
                  type="button"
                  className="text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            />
            <button
              className="rounded-[12px] bg-brand-base px-[18px] py-[10px] font-semibold text-white"
              type="submit"
            >
              {isPending ? 'Tunggu...' : 'Masuk'}
            </button>
            {isError && (
              <p className="text-red-600">{(errMessage as Error).message}</p>
            )}
            <p className="text-center text-xs">
              Belum punya akun?{' '}
              <Link href="/registration">
                <b>Daftar</b>
              </Link>{' '}
              sekarang!
            </p>
          </form>
        </Stack>
      </div>
    </div>
  );
};

export default Page;
