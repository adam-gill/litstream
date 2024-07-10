// firebase/authListener.ts
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { setUser, setLoading } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";

export const authListener = () => {
  const dispatch = useDispatch();

  dispatch(setLoading(true));
  onAuthStateChanged(auth, (user) => {
    dispatch(setUser(user));
    dispatch(setLoading(false));
  });
};
