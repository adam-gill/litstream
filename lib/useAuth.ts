// useAuth.ts
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase';
import { setUser } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

const useAuth = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState<User | null>()
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoadingAuth(false);
      setUser(user)
    });

    return () => unsubscribe();
  }, []);

  return { user, loadingAuth };
};

export default useAuth;
