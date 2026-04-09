import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import AdminLayout from './layouts/AdminLayout.tsx';

import DashboardOverview from './pages/admin/DashboardOverview.tsx';
import StudentsPage from './pages/admin/Students.tsx';
import PaymentsPage from './pages/admin/Payments.tsx';
import TeacherLayout from './layouts/TeacherLayout.tsx';
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/login" element={
          <div className="h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-900/[0.04] dark:bg-[bottom_1px_center]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20"></div>
            
            <div className="p-10 border border-border/40 bg-white/70 dark:bg-card/70 backdrop-blur-3xl rounded-2xl shadow-xl w-[440px] z-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary to-indigo-500"></div>
              
              <div className="flex flex-col items-center mb-8">
                 <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-inner mb-4">
                   <span className="text-primary-foreground font-bold text-2xl leading-none">R</span>
                 </div>
                 <h1 className="text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">Sign in to Raxima</h1>
                 <p className="text-sm text-center text-muted-foreground mt-2">Select a portal to access your account</p>
              </div>
              
              <div className="flex flex-col gap-3">
                 <button onClick={() => window.location.href='/admin/dashboard'} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-medium transition-all shadow-sm active:scale-[0.98]">Admin Portal</button>
                 <button onClick={() => window.location.href='/teacher/dashboard'} className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-3 rounded-xl font-medium transition-all border border-border/50 active:scale-[0.98]">Teacher Portal</button>
                 <button onClick={() => window.location.href='/student/dashboard'} className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-3 rounded-xl font-medium transition-all border border-border/50 active:scale-[0.98]">Student Portal</button>
              </div>
            </div>
          </div>
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
           <Route path="dashboard" element={<div>Teacher Dashboard Overview</div>} />
           <Route path="attendance" element={<AttendanceModule />} />
        </Route>
        
        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
           <Route path="dashboard" element={<StudentDashboard />} />
           <Route path="courses" element={<div>My Courses</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
