import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        window.location.href = '/';
    };

    return (
        <div className="d-flex justify-content-center mt-3">
            <button onClick={handleLogout} className="btn btn-danger">
                Выйти
            </button>
        </div>
    );
};

export default Logout;
