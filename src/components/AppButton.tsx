import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: 'primary' | 'success' | 'danger' | 'neutral' | 'secondary';
  children: ReactNode;
  fullWidth?: boolean;
}

const intentToClasses: Record<NonNullable<AppButtonProps['intent']>, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  neutral: 'bg-gray-500 hover:bg-gray-600 text-white',
  secondary: 'bg-gray-400 hover:bg-gray-500 text-white',
};

const AppButton: FC<AppButtonProps> = ({ intent = 'primary', fullWidth, className = '', children, ...rest }) => {
  const base = 'font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg';
  const width = fullWidth ? 'w-full' : '';
  const classes = `${base} ${intentToClasses[intent]} ${width} ${className}`.trim();
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default AppButton;