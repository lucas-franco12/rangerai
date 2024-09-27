
import React, { ReactNode } from 'react';

interface FormTemplateProps {
  children: ReactNode;
  onBack: () => void;
  onNext: () => void;
  updateData?: (data: any) => void;
}

const FormTemplate: React.FC<FormTemplateProps> = ({ children, onBack, onNext, updateData }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
    >
      <div
        className="relative bg-white bg-opacity-50 p-12 rounded-lg shadow-lg w-[80%] h-[400px] sm:h-[600px]"
        style={{  backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <form className="space-y-6">
          {children}
        </form>
        <div className="absolute bottom-20 left-20 right-20 flex justify-between mt-6">
          <button
            className="bg-green-800 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700 focus:outline-none"
            onClick={onBack}
          >
            Back
          </button>
          <button
            className="bg-green-800 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700 focus:outline-none"
            onClick={onNext}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormTemplate;