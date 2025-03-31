// import { createContext, useContext, useEffect, useState } from "react";
// const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       setUser(null);
//     }
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Loading state while waiting for user data
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "../component/Button";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/me", {
        withCredentials: true, // Send cookies to backend
      });
      setUser(res.data);
      <Button>Logout</Button>;
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        userData,
        {
          withCredentials: true, // Allow cookies to be stored
        }
      );
      setUser(res.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
