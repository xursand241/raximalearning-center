import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { useAuthStore } from './store/auth';
import { supabase } from './lib/supabase';
import { themeService } from './services/themeService';

themeService.initialize();
import AdminLayout from './layouts/AdminLayout.tsx';

import DashboardOverview from './pages/admin/DashboardOverview.tsx';
import StudentsPage from './pages/admin/Students.tsx';
import PaymentsPage from './pages/admin/Payments.tsx';
import TeacherLayout from './layouts/TeacherLayout.tsx';
import TeacherDashboard from './pages/teacher/Dashboard.tsx';
import AttendanceModule from './pages/teacher/AttendanceModule.tsx';
import StudentLayout from './layouts/StudentLayout.tsx';
import StudentDashboard from './pages/student/Dashboard.tsx';
import SmsCenter from './pages/admin/SmsCenter.tsx';
import RelationsPage from './pages/admin/RelationsPage.tsx';
import TeachersPage from './pages/admin/TeachersPage.tsx';
import GroupsPage from './pages/admin/GroupsPage.tsx';
import ParentsPage from './pages/admin/ParentsPage.tsx';
import SubjectsPage from './pages/admin/SubjectsPage.tsx';
import SchedulePage from './pages/admin/SchedulePage.tsx';
import AttendancePage from './pages/admin/AttendancePage.tsx';
import GradesPage from './pages/admin/GradesPage.tsx';
import SettingsPage from './pages/admin/SettingsPage.tsx';

import ParentLayout from './layouts/ParentLayout.tsx';
import ParentDashboard from './pages/parent/Dashboard.tsx';

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleLogin = (role: 'admin' | 'teacher' | 'student' | 'parent') => {
    login({
      id: '1',
      name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
      role: role
    });
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0e14] p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-grid-slate-200/[0.05] bg-[bottom_1px_center] dark:bg-grid-slate-900/[0.05]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#0b0e14] to-transparent"></div>
      
      <div className="p-10 border border-slate-200/60 dark:border-white/5 bg-white/80 dark:bg-card/80 backdrop-blur-3xl rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.1)] w-[460px] z-10 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>
        
        <div className="flex flex-col items-center mb-10">
           <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-[0_8px_24px_rgba(79,70,229,0.3)] mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
             <span className="text-white font-black text-3xl leading-none">R</span>
           </div>
           <h1 className="text-3xl font-black tracking-tight text-center text-slate-900 dark:text-white leading-tight">RAXIMA ACADEMY</h1>
           <p className="text-[15px] font-semibold text-center text-slate-400 mt-2">Loyihaning boshqaruv portaliga xush kelibsiz</p>
        </div>
        
        <div className="flex flex-col gap-3.5">
           <button 
             onClick={() => handleLogin('admin')} 
             className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black text-[15px] transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] border border-transparent"
           >
             ADMIN PORTAL
           </button>
           <button 
             onClick={() => handleLogin('teacher')} 
             className="w-full bg-white dark:bg-white/5 text-slate-900 dark:text-white py-4 rounded-2xl font-black text-[15px] transition-all border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 active:scale-[0.98]"
           >
             TEACHER PORTAL
           </button>
           <button 
             onClick={() => handleLogin('student')} 
             className="w-full bg-white dark:bg-white/5 text-slate-900 dark:text-white py-4 rounded-2xl font-black text-[15px] transition-all border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 active:scale-[0.98]"
           >
             STUDENT PORTAL
           </button>
           <button 
             onClick={() => handleLogin('parent')} 
             className="w-full bg-white dark:bg-white/5 text-slate-900 dark:text-white py-4 rounded-2xl font-black text-[15px] transition-all border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 active:scale-[0.98]"
           >
             PARENT PORTAL
           </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 text-center">
           <p className="text-[12px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Powered by Raxima Hub v2.0</p>
        </div>
      </div>
    </div>
  );
}

function Root() {
  const initializeAuth = useAuthStore(state => state.initialize);
  const setSession = useAuthStore(state => state.setSession);

  React.useEffect(() => {
    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/login" element={
          <LoginPage />
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="relations" element={<RelationsPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="parents" element={<ParentsPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="sms" element={<SmsCenter />} />
          <Route path="grades" element={<GradesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
           <Route path="dashboard" element={<TeacherDashboard />} />
           <Route path="attendance" element={<AttendanceModule />} />
        </Route>
        
        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
           <Route path="dashboard" element={<StudentDashboard />} />
           <Route path="courses" element={<div>My Courses</div>} />
        </Route>

        {/* Parent Routes */}
        <Route path="/parent" element={<ParentLayout />}>
           <Route path="dashboard" element={<ParentDashboard />} />
           <Route path="payments" element={<div>Child Payment History</div>} />
           <Route path="messages" element={<div>Teacher Communications</div>} />
           <Route path="settings" element={<div>Account Settings</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
