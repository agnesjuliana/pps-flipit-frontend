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
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between sm:h-16">
            <button
              onClick={() => route.back()}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
              type="button"
              aria-label="back"
            >
              <MdArrowBackIos className="text-lg text-gray-700 sm:text-xl" />
            </button>
            <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
              Buat Flash Card
            </h1>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
              type="button"
              aria-label="more"
            >
              <MdOutlineMoreVert className="text-lg text-gray-700 sm:text-xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-5 sm:gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInputCreateText
                type="text"
                label="Judul Materi"
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
                  Pilih Folder
                </option>
                {folderListData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </SelectCreateField>
              <FormFileInput
                control={control}
                name="file"
                title="Upload File PDF"
                description="Pilih file PDF untuk di-generate menjadi flashcard"
                variant="md"
                supportFiles={['application/pdf']}
                accept={{ 'application/pdf': ['.pdf'] }}
                isRequired
              />
              <button
                className="hover:bg-brand-dark w-full rounded-xl bg-brand-base px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400 sm:py-3.5"
                type="submit"
                disabled={isPending}
              >
                {isPending ? 'Memproses...' : 'Generate Flashcard'}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen">
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between sm:h-16">
            <button
              onClick={() => setIsSubmitted(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
              type="button"
              aria-label="back"
            >
              <MdArrowBackIos className="text-lg text-gray-700 sm:text-xl" />
            </button>
            <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
              Preview Flashcard
            </h1>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
              type="button"
              aria-label="more"
            >
              <MdOutlineMoreVert className="text-lg text-gray-700 sm:text-xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 pb-24 sm:px-6 sm:py-8">
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-brand-base to-blue-600 p-5 text-white shadow-lg sm:p-6">
          <p className="mb-2 text-base font-bold sm:text-lg">
            {generateData?.title}
          </p>
          <p className="mb-4 text-sm opacity-90 sm:text-base">
            {generateData?.description}
          </p>
          <div className="flex items-center gap-3 rounded-xl bg-white bg-opacity-20 p-3">
            <IoDocumentTextOutline className="flex-shrink-0 text-3xl sm:text-4xl" />
            <div className="flex min-w-0 flex-col">
              <p className="truncate text-xs font-semibold sm:text-sm">
                {generateData?.path}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-xl font-bold text-gray-800 sm:text-2xl">
            Flashcards Generated
          </h3>
          <p className="text-sm text-gray-600">
            {generateData?.flashcards.length} cards dibuat
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:gap-4">
          {generateData &&
            generateData.flashcards.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
              >
                <div className="mb-3 flex items-start gap-2">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-base text-xs font-bold text-white sm:h-7 sm:w-7 sm:text-sm">
                    {index + 1}
                  </span>
                  <p className="flex-1 text-sm font-bold text-gray-800 sm:text-base">
                    {item.question}
                  </p>
                </div>
                <Divider className="my-3" />
                <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                  {item.answer}
                </p>
              </div>
            ))}
        </div>

        <div className="sticky bottom-0 bg-gradient-to-t from-gray-50 pb-6 pt-4">
          <button
            onClick={() => handleSave()}
            disabled={isPendingSave}
            className="hover:bg-brand-dark w-full rounded-xl bg-brand-base px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400 sm:py-4 sm:text-lg"
          >
            {isPendingSave ? 'Menyimpan...' : 'Simpan Flashcard'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
