import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    requiredGroup?: string;
    isLoading: boolean;
}

export const ProtectedRoute = ({ requiredGroup, isLoading }: ProtectedRouteProps) => {
  if (isLoading) return <div>Loading...</div>;

  const obj = localStorage.getItem('brew-and-bean-user');

  const user = JSON.parse(obj || '{}').state;
  const groups = user.groups;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredGroup && !groups.includes(requiredGroup)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};