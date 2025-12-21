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
  const router = useRouter();
  const { handleSubmit, control } = useForm<LoginUserType>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      password: '',
      email: '',
    },
    mode: 'onChange',
  });

  const { mutate, isError, error: errMessage, isPending } = useLogin();

  const onError = (error: FieldErrors<LoginUserType>) => {
    console.log(error);
    return error;
  };

  const onSubmit = (data: LoginUserType) => {
    mutate(data, {
      onSuccess: (loginData: any) => {
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('user', JSON.stringify(loginData));
        router.push('/app/home');
      },
      onError: (e) => {
        // Error akan otomatis ditangani oleh isError dan errMessage
        console.log(e, 'error');
      },
    });
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-[480px] rounded-[20px] bg-white px-8 py-10 shadow-xl">
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
          <div className="flex flex-col gap-1 sm:gap-2">
            <p className="text-xl font-bold leading-7 sm:text-2xl sm:leading-8 md:text-3xl md:leading-9">
              Masuk
            </p>
            <p className="text-xs font-light leading-4 text-gray-600 sm:text-sm sm:leading-5 md:text-base md:leading-6">
              Masuk dan nikmati perjalanan belajar yang menyenangkan!
            </p>
          </div>
          <Stack
            justifyContent="space-between"
            alignItems="left"
            spacing="20px"
          >
            <form
              className="flex w-full flex-col gap-4 sm:gap-5 md:gap-6"
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
                    className="p-1 text-gray-400 transition-colors hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
              />
              <button
                className="hover:bg-brand-dark rounded-[10px] bg-brand-base px-4 py-3 text-sm font-semibold text-white transition-colors active:scale-95 sm:rounded-[11px] sm:px-5 sm:py-3.5 sm:text-base md:rounded-[12px] md:px-6 md:py-4 md:text-base"
                type="submit"
              >
                {isPending ? 'Tunggu...' : 'Masuk'}
              </button>
              {isError && (
                <p className="text-center text-xs text-red-600 sm:text-sm">
                  {(errMessage as Error).message}
                </p>
              )}
              <p className="text-center text-xs text-gray-700 sm:text-sm">
                Belum punya akun?{' '}
                <Link href="/registration">
                  <b className="text-brand-base hover:underline">Daftar</b>
                </Link>{' '}
                sekarang!
              </p>
            </form>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Page;
