import React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layouts/Layout';
import DaycareLayout from './components/layouts/DaycareLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DaycareProfilePage from './pages/DaycareProfilePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import DashboardPage from './pages/DashboardPage';
import ChildManagementPage from './pages/ChildManagementPage';
import MessagesPage from './pages/MessagesPage';
import SchedulePage from './pages/SchedulePage';
import DocumentsPage from './pages/DocumentsPage';
import AttendancePage from './pages/AttendancePage';
import SettingsPage from './pages/SettingsPage';
import AdminDashboard from './pages/AdminDashboard';

import {
  DaycareOverview,
  DaycareMessagesPage,
  DaycareChildrenPage,
  DaycareStaffPage,
  DaycareSchedulePage,
  DaycareSettingsPage
} from './pages/daycare';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/daycare/:id" element={<DaycareProfilePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* Protected parent routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['parent']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="children" element={<ChildManagementPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* Protected provider routes */}
      <Route
        path="/provider-dashboard"
        element={
          <ProtectedRoute allowedRoles={['provider']}>
            <DaycareLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DaycareOverview />} />
        <Route path="messages" element={<DaycareMessagesPage />} />
        <Route path="children" element={<DaycareChildrenPage />} />
        <Route path="staff" element={<DaycareStaffPage />} />
        <Route path="schedule" element={<DaycareSchedulePage />} />
        <Route path="settings" element={<DaycareSettingsPage />} />
      </Route>
      
      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;