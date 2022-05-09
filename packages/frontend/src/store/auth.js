import { useState, createContext, useEffect, useContext } from 'react';
import api from '../services/api';
import * as fireToast from '../utils/fire-toast';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
      setToken(localStorage.getItem('@userToken'));
    }, []);

    const getUser = () => {
      api.get('/profile')
        .then(response => {
          const name = `${response.data.name}${response.data.surname ? ` ${response.data.surname}` : ""}`; 
          fireToast.success(`Bem vindo ${name}!`);
          return setName(name);
        })
        .catch(error => {
          console.log(error);
        })
    };

    const setName = (name) => {
      localStorage.setItem('username', name);
      setUsername(name);
    };

    const signIn = async (data) => {
      getUser();
      setUserId(data.userId);
      setToken(data.token);
      localStorage.setItem('@userToken', data.token);
    };

    const signOut = async () => {
      localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ signIn, signOut, token, username, userId, setName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);