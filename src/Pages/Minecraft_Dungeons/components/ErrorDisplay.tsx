import React from 'react';
//import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';

interface ErrorDisplayProps {
  title: string;
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title, message }) => {
  return (
    <div className="bg-mc-redstone/20 border-l-4 border-mc-redstone p-4 rounded-r-lg mb-6" role="alert">
      <div className="flex items-center">
        <div className="py-1">
        </div>
        <div>
          <p className="font-press-start text-sm text-red-200">{title}</p>
          <p className="text-sm text-red-300 mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
