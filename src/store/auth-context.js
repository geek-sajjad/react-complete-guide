import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userStoredLoggedInInfo = localStorage.getItem('isLoggedIn');
    if (userStoredLoggedInInfo === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        onLogin: loginHandler,
        onLogout: logoutHandler,
        isLoggedIn: isLoggedIn,
      }}
    >
      {' '}
      {props.children}{' '}
    </AuthContext.Provider>
  );
};

export default AuthContext;
