import { useState, createContext, useEffect, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const signIn = async (data) => {
      localStorage.setItem('@userToken', data.token);
      setToken(data.token);
    };

    const signOut = async () => {
      localStorage.removeItem('@userToken');
    };

    useEffect(() => {
      setToken(localStorage.getItem('@userToken'));
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, signOut, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);