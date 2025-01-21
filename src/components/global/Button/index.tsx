import React from 'react';

interface IconButtonProps {
  text: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  color?:
    | 'purple'
    | 'blue'
    | 'green'
    | 'red'
    | 'gray'
    | 'white'
    | 'custom-purple-light';
  textColor?: string;
  className?: string;
  onClick: () => void;
}

const Button: React.FC<IconButtonProps> = ({
  text,
  iconLeft,
  iconRight,
  color = 'purple',
  textColor = 'text-white',
  className = '',
  onClick,
}) => {
  const colorClasses = React.useMemo(
    () => ({
      purple: 'bg-purple-600 hover:bg-purple-700',
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      red: 'bg-red-600 hover:bg-red-700',
      gray: 'bg-gray-600 hover:bg-gray-700',
      white: 'bg-white hover:bg-gray-100',
      'custom-purple-light': 'bg-custom-purple-light hover:bg-purple-100',
    }),
    []
  );

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded ${colorClasses[color]} ${textColor} ${className} transition`}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <span>{text}</span>
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default Button;
