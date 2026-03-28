import AuthService from "@/services/auth.service";
import React, { useCallback, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
 
    const checkAuth = useCallback (async () => {
    try {
      const authService = new AuthService();
      const userExist = await authService.isMe();
      setUser(userExist.user)
    } catch (error) {
       setUser(null)
    }
  },[])
  
  
  return {checkAuth,user}
};

export default useAuth;
