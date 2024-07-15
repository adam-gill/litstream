"use client"
import useAuth from "@/lib/useAuth";

const Settings = () => {
    const { user, loading } = useAuth()
    return (
      <>
          <h1>Account details:</h1>
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
      </>
    );
  };
  
  export default Settings;
  