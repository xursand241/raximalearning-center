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
import Assessments from './pages/teacher/Assessments.tsx';
import Progress from './pages/teacher/Progress.tsx';
import Messages from './pages/teacher/Messages.tsx';
import StudentLayout from './layouts/StudentLayout.tsx';
import StudentDashboard from './pages/student/Dashboard.tsx';
import StudentCourses from './pages/student/Courses.tsx';
import StudentAttendance from './pages/student/Attendance.tsx';
import StudentExams from './pages/student/Exams.tsx';
import StudentPayments from './pages/student/Payments.tsx';
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
import ParentPayments from './pages/parent/Payments.tsx';
import ParentMessages from './pages/parent/Messages.tsx';
import ParentSettings from './pages/parent/Settings.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';



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
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
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
           <Route path="assessments" element={<Assessments />} />
           <Route path="progress" element={<Progress />} />
           <Route path="messages" element={<Messages />} />
        </Route>
        
        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
           <Route path="dashboard" element={<StudentDashboard />} />
           <Route path="courses" element={<StudentCourses />} />
           <Route path="attendance" element={<StudentAttendance />} />
           <Route path="exams" element={<StudentExams />} />
           <Route path="payments" element={<StudentPayments />} />
        </Route>

        {/* Parent Routes */}
        <Route path="/parent" element={<ParentLayout />}>
           <Route path="dashboard" element={<ParentDashboard />} />
           <Route path="payments" element={<ParentPayments />} />
           <Route path="messages" element={<ParentMessages />} />
           <Route path="settings" element={<ParentSettings />} />
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
