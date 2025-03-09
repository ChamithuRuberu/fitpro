import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { UserData } from '@/types/dashboard';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authService = new AuthService();
    const auth = authService.getAuthData();

    if (!auth.token || auth.role_type !== 'ROLE_USER') {
      router.push('/login');
      return;
    }

    if (auth.user) {
      setUserData(auth.user);
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = async () => {
    try {
      const authService = new AuthService();
      authService.logout();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return {
    userData,
    isLoading,
    handleLogout
  };
}; 