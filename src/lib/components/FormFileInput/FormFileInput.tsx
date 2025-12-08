'use client';

import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import UploadFile from '@/app/components/ui/uploadfile';

// import UploadFile from '../UploadFile/UploadFile'; // Adjust the import path as necessary

type FormFileInputType = {
  control: Control<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  name: string;
  title: string;
  description?: string | React.ReactNode;
  supportFiles?: string[];
  accept?: { [key: string]: string[] };
  className?: string;
  isRequired?: boolean;
  variant: 'md' | 'lg';
};

const FormFileInput = (props: FormFileInputType) => {
  const { control, name, ...fileInputProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <UploadFile
          {...fileInputProps}
          name={name}
          onChange={(files) => {
            onChange(files);
            onBlur();
          }}
          error={error?.message}
        />
      )}
    />
  );
};

export default FormFileInput;
