import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Spinner from 'react-bootstrap/Spinner';

const PrivateRouter = ({children}) => {
    const location = useLocation();
    const {user, loading} = useContext(AuthContext);
    if(loading) {
        return <Spinner animation="border" variant="primary" />
    }
    if(user && user?.uid) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRouter;