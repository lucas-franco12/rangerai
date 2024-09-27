'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Spinner from '@/components/Spinner';

const LoadingPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const planTrip = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.push('/confirmation');
    };

    planTrip();
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default LoadingPage;
