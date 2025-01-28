// src/components/AuthModal.tsx
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[350px] h-[400px] flex justify-center flex-col">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 m-1">
          X
        </button>

        {isSignUp ? (
          <>
            <SignUp />
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <button className="text-green-800" onClick={() => setIsSignUp(false)}>
                Sign In
              </button>
            </p>
          </>
        ) : (
          <>
            <SignIn />
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <button className="text-green-800" onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
