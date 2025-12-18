/* eslint-disable no-console */
/* eslint-disable react/no-unstable-nested-components */

'use client';

// import { FormInputCreateText } from '@/lib/components/FormInputCreateText/FormInputCreateText';
import { zodResolver } from '@hookform/resolvers/zod';
import { Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { CreateFolderType } from '@/app/api/Folder/model';
import { CreateFolderSchema } from '@/app/api/Folder/model';
import { useCreateFolder } from '@/app/api/Folder/services';
import ArrowLeft from '@/lib/assets/arrow-left.svg';
import More from '@/lib/assets/more.svg';
import { FormInputCreateText } from '@/lib/components/FormTextCreateInput';

const Page = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<CreateFolderType>({
    resolver: zodResolver(CreateFolderSchema),
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onChange',
  });
  const { mutate, isError, error: errMessage, isPending } = useCreateFolder();

  const onError = (error: FieldErrors<CreateFolderType>) => {
    console.log(error);
    return error;
  };

  const onSubmit = async (data: CreateFolderType) => {
    try {
      const payload = {
        title: data?.title,
        description: data?.description,
      };
      mutate(payload);
      setOpenSnackbar(true);
      reset({});
      router.push('/app/home');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between sm:h-16">
            <button
              onClick={() => router.back()}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
              type="button"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700 sm:h-6 sm:w-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
              Buat Folder
            </h1>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
              type="button"
              aria-label="More"
            >
              <More className="h-5 w-5 text-gray-700 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <form
            className="flex flex-col gap-5 sm:gap-6"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <FormInputCreateText
              type="text"
              label="Nama Folder"
              placeholder="Masukkan nama folder"
              control={control}
              name="title"
              className="w-full"
            />
            <FormInputCreateText
              type="text"
              label="Deskripsi"
              placeholder="Masukkan deskripsi folder"
              control={control}
              name="description"
              className="w-full"
            />
            {isError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-medium text-red-600">
                  {(errMessage as Error).message}
                </p>
              </div>
            )}
            <button
              className="hover:bg-brand-dark w-full rounded-xl bg-brand-base px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400 sm:py-3.5"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Membuat...' : 'Buat Folder'}
            </button>
          </form>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Folder Berhasil Dibuat!"
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      />
    </div>
  );
};

export default Page;
