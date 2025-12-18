'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */

import { Button } from '@nextui-org/react';
import { Copy, Folder } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/styles/utils';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ModalCreate({ isOpen, setIsOpen }: ModalProps) {
  const [selected, setSelected] = useState('');
  const router = useRouter();
  // const [open, setOpen] = useState();

  const handleClick = () => {
    router.push(`/app/home/${selected}`);
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-end justify-center sm:items-center',
        !isOpen && 'hidden'
      )}
    >
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
      />
      <div className="animate-slide-up relative z-20 mx-auto flex w-full max-w-md flex-col gap-4 rounded-t-[28px] bg-white px-5 py-6 shadow-2xl sm:m-4 sm:gap-5 sm:rounded-[28px] sm:px-6 sm:py-8">
        <h3 className="text-center text-lg font-bold text-gray-800 sm:text-xl">
          Buat Baru
        </h3>
        <div className="flex gap-4 sm:gap-5">
          <div
            className={cn(
              'flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-[20px] p-4 transition-all hover:scale-105 sm:gap-4 sm:p-5',
              selected === 'create-flashcard'
                ? 'border-2 border-[#6699CC] bg-blue-50 text-[#6699CC] shadow-md'
                : 'bg-[#F9FAFB] text-[#A1A1AA] hover:bg-gray-200'
            )}
            onClick={() => {
              setSelected('create-flashcard');
            }}
          >
            <Copy className="h-10 w-10 sm:h-12 sm:w-12" />
            <p className="text-sm font-medium sm:text-base">Flash Card</p>
          </div>
          <div
            className={cn(
              'flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-[20px] p-4 transition-all hover:scale-105 sm:gap-4 sm:p-5',
              selected === 'create-folder'
                ? 'border-2 border-[#6699CC] bg-blue-50 text-[#6699CC] shadow-md'
                : 'bg-[#F9FAFB] text-[#A1A1AA] hover:bg-gray-200'
            )}
            onClick={() => {
              setSelected('create-folder');
            }}
          >
            <Folder className="h-10 w-10 sm:h-12 sm:w-12" />
            <p className="text-sm font-medium sm:text-base">Folder</p>
          </div>
        </div>
        <Button
          fullWidth
          className={`rounded-xl py-3 text-sm font-semibold text-white transition-all sm:py-3.5 sm:text-base ${
            selected === ''
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-[#6699CC] hover:bg-[#5588BB] active:scale-95'
          }`}
          onClick={handleClick}
          disabled={selected === ''}
        >
          Tambahkan
        </Button>
      </div>
    </div>
  );
}
