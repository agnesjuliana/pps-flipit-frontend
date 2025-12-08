/* eslint-disable import/no-extraneous-dependencies */
import { useForkRef } from '@mui/material';
import type { ElementType, SelectHTMLAttributes } from 'react';
import { forwardRef, useRef } from 'react';

import { cn } from '@/lib/styles/utils';

export type TSelectFieldProps = {
  addonLeft?: ElementType;
  addonRight?: ElementType;
  label?: string;
  disabled?: boolean;
  isError?: boolean;
  caption?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

// eslint-disable-next-line react/display-name
const SelectField = forwardRef<HTMLSelectElement, TSelectFieldProps>(
  (props, ref) => {
    const {
      className,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      label,
      disabled,
      isError,
      caption,
      children,
      ...rest
    } = props;

    const selectRef = useRef<HTMLSelectElement>();
    const handleRef = useForkRef(selectRef, ref);

    return (
      <div>
        {label && (
          <div className="mb-[6px] text-sm font-medium text-gray-700">
            {label}
          </div>
        )}
        <div
          className={cn(
            'flex h-11 w-full gap-2 rounded-xl bg-gray-100 px-[14px] py-[10px] font-normal',
            disabled && 'bg-gray-50',
            isError && '!border-error300'
          )}
        >
          {AddonLeft && <AddonLeft />}
          <select
            className={cn(
              'flex-grow bg-transparent text-gray-500 focus:outline-none',
              className
            )}
            ref={handleRef}
            disabled={disabled}
            {...rest}
          >
            {children}
          </select>
          {AddonRight && <AddonRight />}
        </div>
        {caption && (
          <div
            className={cn(
              'ml-1 mt-[6px] text-sm',
              isError ? 'text-error-500' : 'text-gray-500'
            )}
          >
            {caption}
          </div>
        )}
      </div>
    );
  }
);

export default SelectField;
