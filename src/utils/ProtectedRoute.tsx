import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { JSX } from 'react';
import { routes } from '@/config/routes';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const user = useSelector((state: RootState) => state.user.user);

    if (!user) {
        // @ts-ignore
        return <Navigate to={routes.login} replace />;
    }

    return children;
};

export default ProtectedRoute;
