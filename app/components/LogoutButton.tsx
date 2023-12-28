// components/LogoutButton.tsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to the login page or handle success
    } catch (error: any) {
      console.error('Logout error:', error.message);
      // Handle logout error
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
