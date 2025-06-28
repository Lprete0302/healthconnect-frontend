import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem('token') || '',
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ ...auth, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ user: null, token: '' });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
