// useAuth.ts
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase';
import { setUser } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user))
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
