import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redirige al login si no está autenticado
        return <Navigate to="/login" />;
    }

    return children;
};


export default ProtectedRoute;