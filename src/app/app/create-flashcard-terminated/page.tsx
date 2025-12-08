import { Button, Divider } from '@nextui-org/react';
import Link from 'next/link';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdArrowBackIosNew, MdOutlineMoreVert } from 'react-icons/md';

export default function CreateFlashCard() {
  return (
    <div className=" relative flex h-screen flex-col p-5">
      <div className="flex items-center gap-3">
        <Link href="/">
          <MdArrowBackIosNew className="text-2xl" />
        </Link>
        <h1 className=" grow text-lg font-bold">Buat Flash Card</h1>
        <Link href="/">
          <MdOutlineMoreVert className="text-2xl" />
        </Link>
      </div>
      <div className="mt-5 flex flex-col rounded-lg bg-[#237AC1] px-3 py-3.5 text-white">
        <p className="text-sm font-extrabold">
          Intro Organization Behavior (OB)
        </p>
        <p className="text-sm">Week 1</p>
        <div className="mt-3 flex items-center gap-2">
          <IoDocumentTextOutline className=" text-4xl" />
          <div className="flex flex-col">
            <p className="text-xs font-bold">
              Organizational Behavior - Chapter 1.pdf
            </p>
            <p className="text-xs">7.3 MB</p>
          </div>
        </div>
      </div>
      <div className="relative mt-4 flex h-full flex-col">
        <h3 className="text-lg font-bold">Flash cards</h3>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col rounded-lg bg-[#F4F4F5] px-3 py-2 shadow-sm">
            <p className="text-sm font-bold">What is Organizational Behavior</p>
            <Divider className="my-3" />
            <p className="text-xs">
              Organizational behavior (OB) is a field of study that investigates
              the impact that individuals, groups, and structure have on
              behavior within organizations for the purpose of applying such
              knowledge toward improving an organization’s effectiveness.
            </p>
          </div>
          <div className="flex flex-col rounded-lg bg-[#F4F4F5] px-3 py-2 shadow-sm">
            <p className="text-sm font-bold">What is Organizational Behavior</p>
            <Divider className="my-3" />
            <p className="text-xs">
              Organizational behavior (OB) is a field of study that investigates
              the impact that individuals, groups, and structure have on
              behavior within organizations for the purpose of applying such
              knowledge toward improving an organization’s effectiveness.
            </p>
          </div>
          <div className="flex flex-col rounded-lg bg-[#F4F4F5] px-3 py-2 shadow-sm">
            <p className="text-sm font-bold">What is Organizational Behavior</p>
            <Divider className="my-3" />
            <p className="text-xs">
              Organizational behavior (OB) is a field of study that investigates
              the impact that individuals, groups, and structure have on
              behavior within organizations for the purpose of applying such
              knowledge toward improving an organization’s effectiveness.
            </p>
          </div>
        </div>
        <Button className="absolute bottom-32 w-full rounded-xl bg-[#69C] py-2 text-white">
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
