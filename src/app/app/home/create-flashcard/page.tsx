/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react';
import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdArrowBackIos, MdOutlineMoreVert } from 'react-icons/md';

import type {
  CreateFlashcardType,
  GenerateData,
  SaveFlashcard,
} from '@/app/api/Flashcard/model';
import { CreateFlashcardSchema } from '@/app/api/Flashcard/model';
import {
  useCreateFlashcard,
  useSaveFlashcard,
} from '@/app/api/Flashcard/services';
import { useFolderList } from '@/app/api/Folder/services';
import ArrowLeft from '@/lib/assets/arrow-left.svg';
import More from '@/lib/assets/more.svg';
import FormFileInput from '@/lib/components/FormFileInput/FormFileInput';
import { FormInputCreateText } from '@/lib/components/FormTextCreateInput';
import SelectCreateField from '@/lib/components/SelectCreateField/SelectCreateField';

const Page = () => {
  // const CreateFlashcard = ({ folders }: CreateFlashcardProps) => {
  const route = useRouter();
  const methods = useForm<CreateFlashcardType>({
    resolver: zodResolver(CreateFlashcardSchema),
    defaultValues: {
      title: '',
      description: '',
      folderId: '',
      file: undefined,
    },
    mode: 'onChange',
  });

  const { handleSubmit, control, reset, getValues } = methods;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generateData, setGenerateData] = useState<GenerateData | null>(null);

  const {
    mutate,
    isError,
    error: errMessage,
    isPending,
  } = useCreateFlashcard();

  const onSubmit: SubmitHandler<CreateFlashcardType> = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('folderId', data.folderId.toString());
    const file = getValues('file');
    // @ts-expect-error error type
    formData.append('file', file[0]);

    mutate(formData, {
      onSuccess: (response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        setIsSubmitted(true);
        setGenerateData(response.data);
      },
      onError: (error: Error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // Handle error (e.g., show an error message)
      },
    });
  };

  const {
    mutate: mutateSave,
    isError: isErrorSave,
    error: errMessageSave,
    isPending: isPendingSave,
  } = useSaveFlashcard();

  const handleSave = () => {
    const payload = {
      title: generateData?.title,
      description: generateData?.description,
      folderId: Number(generateData?.folderId),
      sourceId: generateData?.sourceId,
      path: generateData?.path,
      flashcards: generateData?.flashcards,
    };
    mutateSave(payload, {
      onSuccess: (response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        const title = generateData?.title.replace(/ /g, '-');
        route.push(`/app/folder/${generateData?.folderId}/${title}`);
      },
      onError: (error: Error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // Handle error (e.g., show an error message)
      },
    });
  };

  const {
    data: folderListData,
    isLoading: isFolderLoading,
    isError: isFolderError,
    error: folderError,
  } = useFolderList();

  return !isSubmitted ? (
    <div className="relative flex h-screen flex-col p-5">
      <div className="flex items-center gap-3">
        <button type="button" aria-label="back">
          <MdArrowBackIos className="text-2xl" />
        </button>
        <h1 className=" grow text-lg font-bold">Buat Flash Card</h1>
        <button type="button" aria-label="more">
          <MdOutlineMoreVert className="text-2xl" />
        </button>
      </div>
      <div className="flex flex-col gap-6 pb-24 pt-10">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInputCreateText
              type="text"
              label="Judul"
              control={control}
              name="title"
              placeholder="Masukkan Judul Materi"
              className="w-full"
            />
            <FormInputCreateText
              type="text"
              label="Deskripsi"
              control={control}
              name="description"
              placeholder="Masukkan Deskripsi Materi"
              className="w-full"
            />
            <SelectCreateField
              label="Folder"
              placeholder="Pilih Folder"
              className="w-full light"
              name="folderId"
            >
              <option disabled selected value="">
                Tingkat Pendidikan
              </option>
              {folderListData?.map((item) => (
                <option value={item.id}>{item.title}</option>
              ))}
            </SelectCreateField>
            <FormFileInput
              control={control}
              name="file"
              title="Upload your file"
              description="Select a file to upload"
              variant="md"
              supportFiles={['application/pdf']}
              accept={{ 'application/pdf': ['.pdf'] }}
              isRequired
            />
            <button
              className="mt-[20px] w-full rounded-[12px] bg-brand-base px-[18px] py-[10px] font-semibold text-white"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Tunggu...' : 'Buat'}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  ) : (
    <div className="relative flex min-h-screen flex-col p-5">
      <div className="flex items-center gap-3">
        <button type="button" aria-label="back">
          <MdArrowBackIos className="text-2xl" />
        </button>
        <h1 className=" grow text-lg font-bold">Buat Flash Card</h1>
        <button type="button" aria-label="more">
          <MdOutlineMoreVert className="text-2xl" />
        </button>
      </div>
      <div className="mt-5 flex flex-col rounded-lg bg-[#237AC1] px-3 py-3.5 text-white">
        <p className="text-sm font-extrabold">{generateData?.title}</p>
        <p className="text-sm">{generateData?.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <IoDocumentTextOutline className=" text-4xl" />
          <div className="flex flex-col">
            <p className="text-xs font-bold">{generateData?.path}</p>
          </div>
        </div>
      </div>
      <div className="relative mt-4 flex h-full flex-col">
        <h3 className="text-lg font-bold">Flash cards</h3>
        <div className="mt-3 flex flex-col gap-3">
          {generateData &&
            generateData.flashcards.map((item) => (
              <div className="flex flex-col rounded-lg bg-[#F4F4F5] px-3 py-2 shadow-sm">
                <p className="text-sm font-bold">{item.question}</p>
                <Divider className="my-3" />
                <p className="text-xs">{item.answer}</p>
              </div>
            ))}
        </div>
        <Button
          onClick={() => handleSave()}
          className="mt-5 w-full rounded-xl bg-[#69C] py-2 text-white"
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
};

export default Page;
