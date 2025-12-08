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
      <header className="items-center justify-between text-white">
        <div className="relative z-10">
          <div className="fixed left-1/2 top-4 flex h-11 w-full max-w-xs -translate-x-1/2 transform items-center bg-white">
            <div className="flex items-center text-black">
              <ArrowLeft style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="flex flex-grow items-center px-5 text-black">
              <p className="text-l font-bold">Buat Folder</p>
            </div>
            <div className="flex items-center justify-end text-black">
              <More style={{ width: '24px', height: '24px' }} />
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-6 p-6 pb-24 pt-24">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <FormInputCreateText
            type="text"
            label="Nama"
            placeholder="Masukkan nama folder"
            control={control}
            name="title"
            className=""
          />
          <FormInputCreateText
            type="text"
            label="Deskripsi"
            placeholder="Masukkan deskripsi"
            control={control}
            name="description"
            className="mt-[8px] max-w-xs"
          />
          <button
            className="mt-[20px] w-full rounded-[12px] bg-brand-base px-[18px] py-[10px] font-semibold text-white"
            type="submit"
          >
            {isPending ? 'Tunggu...' : 'Buat'}
          </button>
          {isError && (
            <p className="text-red-600">{(errMessage as Error).message}</p>
          )}
        </form>
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
