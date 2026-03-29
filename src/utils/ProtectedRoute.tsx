import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from './getUser';
import { LoadingPage } from '../pages/LoadingPage';

interface ProtectedRouteProps {
    requiredGroup?: string;
    isLoading: boolean;
}

export const ProtectedRoute = ({ requiredGroup, isLoading }: ProtectedRouteProps) => {
  if (isLoading) return <LoadingPage />;

  const user = getUser();
  const groups = user.groups;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredGroup && !groups.includes(requiredGroup)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};