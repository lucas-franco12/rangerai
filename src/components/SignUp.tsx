// src/components/SignUp.tsx
'use client';

import React, { useState } from 'react';
import { signUp } from '@/utils/firebase'; 
import { useRouter } from 'next/navigation'; 

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signUp(email, password);
      router.push('/dashboard'); 
    } catch (err: any) {
      setError(err.message); 
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSignUp} className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 text-black rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 text-black rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full p-2 text-black rounded"
          />
        </div>
        <button type="submit" className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
