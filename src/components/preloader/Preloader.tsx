import React from 'react';

type PreloaderProps = {
  small?: boolean;
};

export const Preloader: React.FC<PreloaderProps> = ({ small }) => {
  const containerClass = small ? 'max-h-screen' : 'min-h-screen';
  const spinnerClass = small ? 'h-8 w-8 border-t border-b ' : '';

  return (
    <div className={`flex items-center justify-center ${containerClass}`}>
      <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 ${spinnerClass}`}></div>
    </div>
  );
};