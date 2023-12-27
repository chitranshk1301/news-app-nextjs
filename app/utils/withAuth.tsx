"use client"

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';

const withAuth = (WrappedComponent: FC) => {
  const Wrapper: FC = (props) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <p>Loading...</p>;

    if (!user) {
      router.replace('/login');
      return <p>Redirecting...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
