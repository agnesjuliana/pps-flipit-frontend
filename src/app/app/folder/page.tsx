/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */

'use client';

import { useRouter } from 'next/navigation';

import { Card } from '@/lib/components/Card';
import { getAllFolders } from '@/lib/data/mockData';

const Page = () => {
  const router = useRouter();

  // Use mock data
  const folderListData = getAllFolders();

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
      <Card className="h-full w-full border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-4 transition-all duration-200 hover:border-green-400 hover:from-green-50 hover:to-emerald-50 hover:shadow-lg sm:p-5">
        <div className="flex flex-col gap-2">
          <p className="mb-1 text-4xl sm:text-5xl">📁</p>
          <p className="line-clamp-2 text-sm font-bold sm:text-base">{title}</p>
          <p className="line-clamp-1 text-xs text-gray-500">{subtitle}</p>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Folder Kelas
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {folderListData && folderListData.length > 0 ? (
            folderListData.map((item) => (
              <button
                key={item?.id}
                type="button"
                onClick={() => handleCardClick(item?.id, item?.title)}
                className="group w-full text-left"
                aria-label="Open Folder"
              >
                <div className="h-full transition-transform duration-200 group-hover:scale-105">
                  <ClassFolderCard
                    title={item?.title}
                    subtitle={item?.description}
                  />
                </div>
              </button>
            ))
          ) : (
            <div className="col-span-full flex items-center gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
              <svg
                className="h-5 w-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="font-medium">Kamu belum membuat Folder!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
