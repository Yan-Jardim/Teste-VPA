'use client';

import React, { useState, useCallback } from 'react';
import { CiSearch } from 'react-icons/ci';

interface TextInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  showIcon?: boolean;
  onInputChange?: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = 'text',
  placeholder = '',
  className = '',
  showIcon = true,
  onInputChange,
}) => {
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      if (onInputChange) {
        onInputChange(newValue);
      }
    },
    [onInputChange]
  );

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={` ${className}shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 ${
            showIcon ? 'pl-10' : 'pl-3'
          } text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500`}
        />
        {showIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <CiSearch className="h-5 w-5 text-gray-400" />
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
