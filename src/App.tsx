import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import EditOutfitPage from './pages/EditOutfitPage';
import SavedOutfitsPage from './pages/SavedOutfitsPage';
import ProfilePage from './pages/ProfilePage';
import UploadClothPage from './pages/UploadClothPage';
import LoginPage from './pages/LoginPage';
import { isLoggedIn } from './services/api';
import './App.css';

// 需要登录的路由保护组件
function PrivateRoute({ children }: { children: React.ReactNode }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// 已登录时重定向组件
function PublicRoute({ children }: { children: React.ReactNode }) {
  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          <Route path="/edit" element={
            <PrivateRoute>
              <EditOutfitPage />
            </PrivateRoute>
          } />
          <Route path="/outfits" element={
            <PrivateRoute>
              <SavedOutfitsPage />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route path="/upload" element={
            <PrivateRoute>
              <UploadClothPage />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
