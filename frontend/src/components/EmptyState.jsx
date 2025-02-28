import React from 'react';

const EmptyState = ({ message, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 mb-4">
        <svg 
          className="w-full h-full text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {message}
      </h3>
      {description && (
        <p className="text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState; 