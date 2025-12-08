/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */

'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useFlashcardList } from '@/app/api/Flashcard/services';
import { useFolderList } from '@/app/api/Folder/services';
import ModalCreate from '@/app/components/modalcreate';
import { Card } from '@/lib/components/Card';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const {
    data: folderListData,
    isLoading: isFolderLoading,
    isError: isFolderError,
    error: folderError,
  } = useFolderList();
  const {
    isLoading: isFlashcardLoading,
    isError: isFlashcardError,
    error: flashcardError,
  } = useFlashcardList();

  if (isFlashcardLoading) return <div>Loading...</div>;
  if (isFlashcardError) return <div>Error: {flashcardError.message}</div>;

  if (isFolderLoading) return <div>Loading...</div>;
  if (isFolderError) return <div>Error: {folderError.message}</div>;

  const handleCreate = () => {
    router.push('/app/home/create-folder');
  };

  const handleCardClick = (id: string | number, title: string) => {
    const path = title.replace(/\s/g, '-');
    router.push(`/app/folder/${id}/${path}`);
  };

  const ClassFolderCard = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => {
    return (
      <Card className="mb-2 flex w-full border-[#E4E4E7] bg-[#F9FAFB] p-3">
        <div className="flex flex-col gap-1">
          <p className="text-4xl">📁</p>
          <p className="text-sm font-bold">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-3 p-6 pt-4">
        <header className="items-center justify-between text-white">
          <div className="relative z-10 flex">
            <div className="flex flex-grow items-center text-black">
              <h1 className="text-4xl font-bold">Folder Kelas</h1>
            </div>
            <div className="flex items-center justify-end text-black">
              <button
                type="button"
                onClick={() => handleCreate()}
                className="flex items-center justify-center"
                style={{ width: '24px', height: '24px' }}
                aria-label="Create Folder"
              >
                <Plus />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="flex flex-col gap-3 p-6 pb-24 pt-4">
        <div className="bg-base-black container flex-col overflow-auto whitespace-nowrap">
          {folderListData && folderListData.length > 0 ? (
            folderListData.map((item) => (
              <button
                key={item?.id}
                type="button"
                onClick={() => handleCardClick(item?.id, item?.title)}
                className="flex w-full text-left"
                aria-label="Create Folder"
              >
                <ClassFolderCard
                  title={item?.title}
                  subtitle={item?.description} // Use description as subtitle
                />
              </button>
            ))
          ) : (
            <div
              className="mb-4 flex w-full items-center rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800"
              role="alert"
            >
              <svg
                className="me-3 inline h-4 w-4 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="w-full">
                <span className="font-medium">Kamu belum membuat Folder!</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalCreate isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default Page;
