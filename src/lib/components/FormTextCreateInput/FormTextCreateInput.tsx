'use client';

/* eslint-disable import/no-extraneous-dependencies */
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { TTextFieldProps } from '../TextField/TextField';
import TextFieldCreate from '../TextFieldCreate/TextFieldCreate';

type FormTextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  name: string;
  label: string;
  errorMessage?: string;
} & TTextFieldProps;

const FormTextCreateInput = (props: FormTextType) => {
  const { control, name, label, errorMessage, placeholder, ...inputProps } =
    props;

  return (
    <Controller
      name={name || ''}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextFieldCreate
          {...inputProps}
          placeholder={placeholder || ''}
          label={label}
          onChange={onChange}
          isError={!!error}
          caption={error?.message || errorMessage}
          value={value || ''}
        />
      )}
    />
  );
};

export default FormTextCreateInput;
