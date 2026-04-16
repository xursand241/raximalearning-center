import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/auth";

export default function App() {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  
  // Dynamic redirect based on role
  if (user?.role === 'admin' || user?.role === 'superadmin') {
    return <Navigate to="/admin/dashboard" />;
  }
  
  if (user?.role === 'teacher') {
    return <Navigate to="/teacher/dashboard" />;
  }
  
  if (user?.role === 'student') {
    return <Navigate to="/student/dashboard" />;
  }
  
  return <Navigate to="/auth/login" />;
}
