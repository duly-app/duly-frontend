import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import useAuth from '../context/UseAuth';

const AuthRoute = () => {
    const { loggedIn, isLoading } = useAuth();

    if (isLoading) {
        return <Spinner className="size-8" />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthRoute;