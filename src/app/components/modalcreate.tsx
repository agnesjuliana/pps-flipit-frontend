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
      className={cn('absolute bottom-0 z-[9999] w-full', !isOpen && 'hidden')}
    >
      <div
        onClick={() => setIsOpen(false)}
        className="relative -z-10 flex h-screen w-full items-end bg-[#3F3F46] bg-opacity-40 "
      />
      <div className="relative z-20 flex w-full flex-col gap-5 rounded-t-[28px] bg-white px-5 py-8">
        <div className="flex gap-7">
          <div
            className={cn(
              'flex grow cursor-pointer flex-col items-center gap-5 rounded-[20px]  p-5 ',
              selected === 'create-flashcard'
                ? 'border-2 border-[#69C] text-[#6699CC]'
                : 'bg-[#F9FAFB] text-[#A1A1AA]'
            )}
            onClick={() => {
              setSelected('create-flashcard');
            }}
          >
            <Copy className=" text-5xl" />
            <p>Flash Card</p>
          </div>
          <div
            className={cn(
              'flex grow cursor-pointer flex-col items-center gap-5 rounded-[20px]  p-5 ',
              selected === 'create-folder'
                ? 'border-2 border-[#69C] text-[#6699CC]'
                : 'bg-[#F9FAFB] text-[#A1A1AA]'
            )}
            onClick={() => {
              setSelected('create-folder');
            }}
          >
            <Folder className=" text-5xl" />
            <p>Folder</p>
          </div>
        </div>
        <Button
          fullWidth
          className={`rounded-lg py-2 text-white ${
            selected === '' ? 'bg-gray-400' : 'bg-[#6699CC]'
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
