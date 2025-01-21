import React from 'react';

interface DividerProps {
  text?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ text, className }) => {
  return (
    <div className={`flex items-center w-full ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      {text && (
        <span className="mx-4 text-gray-500 whitespace-nowrap">{text}</span>
      )}
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default Divider;
