import { useState, createContext, useEffect, useContext } from 'react';
import api from '../services/api';
import * as fireToast from '../utils/fire-toast';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);

    const getUser = () => {
      api.get('/profile')
        .then(response => {
          const userName = `${response.data.name}${response.data.surname ? ` ${response.data.surname}` : ""}`; 
          fireToast.success(`Bem vindo ${userName}!`);
          localStorage.setItem('username', userName);
          return setUsername(userName);
        })
        .catch(error => {
          console.log(error);
        })
    }

    const signIn = async (data) => {
      getUser();
      setUserId(data.userId);
      localStorage.setItem('@userToken', data.token);
      setToken(data.token);
    };

    const signOut = async () => {
      localStorage.clear();
    };

    useEffect(() => {
      setToken(localStorage.getItem('@userToken'));
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, signOut, token, username, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);