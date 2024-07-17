// useAuth.ts
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase';
import { setUser } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [loadingAuth, setLoadingAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user))
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loadingAuth };
};

export default useAuth;
