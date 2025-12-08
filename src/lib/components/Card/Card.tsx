import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = ({ children, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={`rounded-lg border border-gray-100 bg-white p-3 ${props.className}`}
    >
      {children}
    </div>
  );
};

export default Card;
