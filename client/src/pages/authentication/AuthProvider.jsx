import React, { createContext, useContext, useEffect, useState } from "react";
import useFetchCart from "../../components/Cart/fetchCart";
import { checkSession, fetchUser } from "../../services/userServices";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const fetchCart = useFetchCart();
  

  const checkSessionData = async () => {
    try {
        const response  = await checkSession();
      
    } catch (error) {
      console.error("Check session error:", error);
    }
  };


  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      checkSessionData();
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }


  const login = async(username) => {
    
    localStorage.setItem("username", username); 
    localStorage.setItem("user",JSON.stringify(await fetchUser()));

    fetchCart();
  
    
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("cart");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthContext);
};
