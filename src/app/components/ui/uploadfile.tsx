'use client';

/* eslint-disable no-nested-ternary */

import Image from 'next/image';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { Accept, FileRejection } from 'react-dropzone';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

type UploadFileProps = {
  supportFiles?: string[];
  accept?: Accept;
  className?: string;
  title: string;
  name: string;
  description?: string | ReactNode;
  isRequired?: boolean;
  variant: 'md' | 'lg';
  onChange?: (files: File[]) => void;
  error?: string;
};

// https://react-dropzone.js.org/#section-accepting-specific-file-types
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

export default function UploadFile({
  supportFiles = [],
  accept = {},
  className,
  title,
  name,
  description,
  variant,
  onChange,
  error,
}: UploadFileProps) {
  const [fileUrl, setfileUrl] = useState('');
  const { setValue } = useFormContext();

  const onDrop = useCallback(
    async <T extends File>(
      acceptedFiles: T[],
      rejectedFiles: FileRejection[]
    ) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const message =
          rejectedFiles[0].errors[0].code === 'file-too-large'
            ? 'Ukuran file terlalu besar'
            : rejectedFiles[0].errors[0].code === 'file-invalid-type'
              ? 'Tipe file tidak didukung'
              : (rejectedFiles[0].errors[0].message as string);
        onChange?.([]);
        // Handle the error message in the parent component if necessary
      } else {
        setfileUrl(URL.createObjectURL(acceptedFiles[0]));
        setValue(name, acceptedFiles[0]);
        onChange?.(acceptedFiles);
      }
    },
    [onChange, setValue, name]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 10000000, // 10 mb
    accept,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setfileUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [acceptedFiles]);

  return (
    <section className={twMerge(`${className}`, 'flex w-full flex-col')}>
      <div className="mb-[6px]">
        {description === '' ? null : (
          <p className="text-xs text-default-400">{description}</p>
        )}
      </div>
      <div>
        {fileUrl ? (
          <div
            className={twMerge(
              'relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2  border-default-500 max-md:py-[18px]',
              variant === 'md' ? 'py-6' : 'py-8'
            )}
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="absolute right-0 top-0 flex rounded-xl rounded-ee-none rounded-ss-none bg-gradient-to-l from-[#237AC1] to-[#7828C8] px-3 py-2">
                <Image
                  src="/assets/app/flashcard/star.png"
                  width={15}
                  height={12}
                  alt=""
                />
                <p className="text-xs text-white">AI Powered</p>
              </div>
              <FiUpload className={twMerge('text-4xl text-[#6699CC]')} />
              <div className="flex flex-col gap-1">
                <p
                  className={twMerge(
                    'px-10 font-bold text-default-700 max-md:text-sm ',
                    variant === 'md' ? 'text-base' : 'text-lg'
                  )}
                >
                  {acceptedFiles.length > 0 && acceptedFiles[0].name}
                </p>

                {acceptedFiles.length === 0 && (
                  <p className="px-10 text-xs text-default-500">
                    (File :{supportFiles.join(', ')}, maks. 10 MB)
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <section className="flex flex-col gap-4">
            {error === '' ? (
              <div
                className={twMerge(
                  'relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-default-400 max-md:py-[18px]',
                  variant === 'md' ? 'py-6' : 'py-8'
                )}
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center gap-2 text-center text-default-500 ">
                  <div className="absolute right-0 top-0 flex rounded-xl rounded-ee-none rounded-ss-none bg-gradient-to-l from-[#237AC1] to-[#7828C8] px-3 py-2">
                    <Image
                      src="/assets/app/flashcard/star.png"
                      width={15}
                      height={12}
                      alt=""
                    />
                    <p className="text-xs text-white">AI Powered</p>
                  </div>
                  <FiUpload className="text-4xl text-[#6699CC]" />
                  <div className="flex flex-col gap-1">
                    <p className={twMerge('text-sm font-bold text-[#6699CC]')}>
                      {title}
                    </p>
                    <p className="px-10 text-sm">
                      (File : {supportFiles.join(', ')}, maks. 10 MB)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={twMerge(
                  'relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-danger-500 max-md:py-[18px]',
                  variant === 'md' ? 'py-6' : 'py-8'
                )}
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center gap-2 text-center text-danger-500 ">
                  <FiUpload className="text-4xl text-[#6699CC]" />
                  <div className="flex flex-col gap-1">
                    <p
                      className={twMerge(
                        'font-bold max-md:text-sm',
                        variant === 'md' ? 'text-base' : 'text-lg'
                      )}
                    >
                      Upload Gagal!
                    </p>
                    <div className="flex flex-col gap-1">
                      <p
                        className={twMerge(
                          'font-semibold',
                          variant === 'md' ? 'text-sm' : 'text-base'
                        )}
                      >
                        {error}
                      </p>
                      <p className="px-10 text-sm">
                        Click or Drag & Drop
                        <br />
                        <span>
                          Format file : {supportFiles.join(', ')} <br />{' '}
                          maksimal file : 3Mb
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </section>
  );
}
