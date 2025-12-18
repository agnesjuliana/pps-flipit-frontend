'use client';

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */

import { zodResolver } from '@hookform/resolvers/zod';
import { Snackbar, Stack } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { CreateUserType } from '../api/Auth';
import { CreateUserSchema } from '../api/Auth';
import { useRegister } from '../api/Auth/services';
import { FormSelectField } from '@/lib/components/FormSelectField';
import { FormInputText } from '@/lib/components/FormTextInput';

const Page = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { handleSubmit, control, reset } = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      password: '',
      name: '',
      email: '',
    },
    mode: 'onChange',
  });
  const { mutate, isError, error: errMessage, isPending } = useRegister();

  const onError = (error: FieldErrors<CreateUserType>) => {
    console.log(error);
    return error;
  };

  const onSubmit = async (data: CreateUserType) => {
    try {
      const payload = {
        educationLevel: data?.educationLevel,
        email: data?.email,
        name: data?.name,
        password: data?.password,
      };
      console.log('Payload being sent:', payload);
      mutate(payload, {
        onSuccess: () => {
          setOpenSnackbar(true);
          reset({});
        },
      });
    } catch (e) {
      console.log('Registration error:', e);
    }
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-[20px] bg-white px-8 py-10 shadow-xl">
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
          <div className="flex flex-col gap-1 sm:gap-2">
            <p className="text-xl font-bold leading-7 sm:text-2xl sm:leading-8 md:text-3xl md:leading-9">
              Selamat Datang
            </p>
            <p className="text-xs font-light leading-4 text-gray-600 sm:text-sm sm:leading-5 md:text-base md:leading-6">
              Yuk isi biodata kamu sesuai ketentuan dibawah
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
              <FormInputText name="name" control={control} label="Nama" />
              <FormSelectField
                name="educationLevel"
                control={control}
                label="Education Level"
              >
                <option disabled selected value="">
                  Tingkat Pendidikan
                </option>
                <option value="Elementary_School">Sekolah Dasar (SD)</option>
                <option value="Junior_High_School">
                  Sekolah Menengah Pertama (SMP)
                </option>
                <option value="Senior_High_School">
                  Sekolah Menengah Atas (SMA)
                </option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Bachelor">Bachelor</option>
              </FormSelectField>
              <FormInputText name="email" control={control} label="Email" />
              <FormInputText
                type={showPassword1 ? 'text' : 'password'}
                name="password"
                control={control}
                label="Kata Sandi"
                addonRight={() => (
                  <button
                    type="button"
                    className="p-1 text-gray-400 transition-colors hover:text-gray-600"
                    onClick={() => setShowPassword1(!showPassword1)}
                  >
                    {showPassword1 ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
              />
              <FormInputText
                type={showPassword2 ? 'text' : 'password'}
                name="confirm_password"
                control={control}
                label="Konfirmasi Kata Sandi"
                addonRight={() => (
                  <button
                    type="button"
                    className="p-1 text-gray-400 transition-colors hover:text-gray-600"
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
              />
              <button
                className="hover:bg-brand-dark w-full rounded-[10px] bg-brand-base px-4 py-3 text-sm font-semibold text-white transition-colors active:scale-95 sm:rounded-[11px] sm:px-5 sm:py-3.5 sm:text-base md:rounded-[12px] md:px-6 md:py-4 md:text-base"
                type="submit"
              >
                {isPending ? 'Tunggu...' : 'Daftar'}
              </button>
              {isError && (
                <p className="text-center text-xs font-medium text-red-600 sm:text-sm">
                  {(errMessage as any)?.response?.data?.message ||
                    (errMessage as Error).message}
                </p>
              )}
              <p className="text-center text-xs text-gray-700 sm:text-sm">
                Sudah punya akun? silakan{' '}
                <Link href="/login">
                  <b className="text-brand-base hover:underline">masuk.</b>
                </Link>
              </p>
              <p className="text-center text-xs text-gray-700 sm:text-sm">
                Dengan melakukan registrasi, kamu menyetujui tentang{' '}
                <b className="text-gray-900">Syarat</b> dan{' '}
                <b className="text-gray-900"> Kebijakan Privasi</b>
              </p>
            </form>
          </Stack>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Registrasi Berhasil"
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      />
    </div>
  );
};

export default Page;
