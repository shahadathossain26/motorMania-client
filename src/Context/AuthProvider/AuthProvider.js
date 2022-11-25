import React, { createContext } from 'react';
import { getAuth } from 'firebase/auth'
import app from '../../Firebase/firebase.config';

const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    return (
        <div>

        </div>
    );
};

export default AuthProvider;