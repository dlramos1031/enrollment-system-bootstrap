import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/backend/check_session.php');
        setIsAuthenticated(response.data.logged_in);
      } catch (error) {
        console.error("Failed to check session", error);
      }
    };

    checkSession();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/backend/login.php', { username, password });
      setIsAuthenticated(response.data.success);
      return response.data;
    } catch (error) {
      console.error("Failed to log in", error);
      return { success: false };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('/backend/register.php', { username, email, password });
      return response.data;
    } catch (error) {
      console.error("Failed to register", error);
      return { success: false };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/backend/logout.php');
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
