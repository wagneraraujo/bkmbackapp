import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useAuth();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem('authToken');
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data.user) {
          setUser(data.user);
        }
      }
    }
    validateToken();
  }, [api]);

  const signin = async (email: string, password: string) => {
    // email, token
    const data = await api.signin(email, password);
    // if (data.email && data.token ) {
    //   setUser(data.user);
    //   setToken(data.token);
    //   return true;
    // }
    return true;
  }

  const signout = async () => {
    setUser(null);
    setToken('');
    await api.logout();
  }

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  }

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}