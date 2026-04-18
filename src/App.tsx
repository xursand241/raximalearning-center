import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/auth";

export default function App() {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0e14]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
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
