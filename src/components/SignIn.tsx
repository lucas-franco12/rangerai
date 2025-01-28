// src/components/SignIn.tsx
'use client';

import React, { useState } from 'react';
import { signIn } from '@/utils/firebase'; 
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      router.push('/dashboard'); 
    } catch (err: any) {
      setError(err.message); 
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSignIn} className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign In</h2>
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
        <button type="submit" className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
