import { useForkRef } from '@mui/material';
import clsx from 'clsx';
import type { ElementType, InputHTMLAttributes } from 'react';
import { forwardRef, useRef } from 'react';

export type TTextFieldProps = {
  addonLeft?: ElementType;
  addonRight?: ElementType;
  label?: string;
  disabled?: boolean;
  isError?: boolean;
  caption?: string;
} & InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line react/display-name
const TextFieldCreate = forwardRef<HTMLInputElement, TTextFieldProps>(
  (props, ref) => {
    const {
      className,
      addonLeft: AddonLeft,
      addonRight: AddonRight,
      label,
      disabled,
      isError,
      caption,
      ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement>();
    const handleRef = useForkRef(inputRef, ref);

    return (
      <div>
        <div className="flex w-full flex-col rounded-lg bg-[#F4F4F5] px-3 py-2">
          <p className="!text-xs font-bold">{label}</p>
          <input
            className={clsx(
              'flex-grow bg-transparent text-gray-500  focus:text-gray-900 focus:outline-none',
              className
            )}
            ref={handleRef}
            disabled={disabled}
            {...rest}
          />
        </div>
        {caption && (
          <div
            className={clsx(
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

export default TextFieldCreate;
