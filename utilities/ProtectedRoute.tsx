import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { JSX } from 'react';
import { routes } from '@/routes';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const user = useSelector((state: RootState) => state.user.user);

    if (!user) {
        // Si l'utilisateur n'est pas connecté, on redirige vers la page de login
        // @ts-ignore
        return <Navigate to={routes.login} replace />;
    }

    // Sinon on affiche le contenu protégé
    return children;
};

export default ProtectedRoute;
