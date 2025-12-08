'use client';

/* eslint-disable import/no-extraneous-dependencies */
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { TSelectFieldProps } from '../SelectField/SelectField';
import SelectField from '../SelectField/SelectField';

type FormSelectType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  name: string;
  label: string;
} & TSelectFieldProps;

const FormSelectField = (props: FormSelectType) => {
  const { control, name, label, children, ...selectProps } = props;

  return (
    <Controller
      name={name || ''}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SelectField
          {...selectProps}
          onChange={onChange}
          isError={!!error}
          caption={error?.message}
          value={value || ''}
        >
          {children}
        </SelectField>
      )}
    />
  );
};

export default FormSelectField;
