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
      dateOfBirth: '',
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
        dateOfBirth: data?.dateOfBirth,
        educationLevel: data?.educationLevel,
        email: data?.email,
        name: data?.name,
        password: data?.password,
      };
      mutate(payload);
      setOpenSnackbar(true);
      reset({});
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="absolute bottom-0 w-full rounded-t-[32px] bg-white px-[21px] py-10 md:relative md:mx-auto md:my-10 md:max-w-2xl md:rounded-2xl md:shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-[6px]">
          <p className="text-2xl font-bold leading-8">Selamat Datang</p>
          <p className="text-sm font-light leading-5">
            Yuk isi biodata kamu sesuai ketentuan dibawah
          </p>
        </div>
        <Stack justifyContent="space-between" alignItems="left" spacing="20px">
          <form
            className="flex w-[100%] flex-col gap-5"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <FormInputText name="name" control={control} label="Nama" />
            <FormInputText
              name="dateOfBirth"
              control={control}
              label="Tanggal Lahir"
              placeholder="Tanggal Lahir"
              type="date"
              id="date"
            />
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
                  className="text-gray-400"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  {showPassword1 ? <EyeOff size={16} /> : <Eye size={16} />}
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
                  className="text-gray-400"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            />
            <button
              className="rounded-[12px] bg-brand-base px-[18px] py-[10px] font-semibold text-white"
              type="submit"
            >
              {isPending ? 'Tunggu...' : 'Daftar'}
            </button>
            {isError && (
              <p className="text-red-600">{(errMessage as Error).message}</p>
            )}
            <p className="text-center text-xs">
              Sudah punya akun? silakan{' '}
              <Link href="/login">
                <b>masuk.</b>
              </Link>
            </p>
            <p className="text-center text-xs">
              Dengan melakukan registrasi, kamu menyetujui tentang <b>Syarat</b>{' '}
              dan <b> Kebijakan Privasi</b>
            </p>
          </form>
        </Stack>
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
