import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute'
import { AuthProvider } from '@/features/auth/AuthContext';
// import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { WritePage } from '@/pages/WritePage';
import { EditPage } from '@/pages/EditPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { FeedPage } from '@/pages/FeedPage';
import { PostPage } from '@/pages/PostPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/@:username" element={<ProfilePage />} />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/write"
              element={
                <ProtectedRoute>
                  <WritePage />
                </ProtectedRoute>
              } />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPage />
                </ProtectedRoute>
              } />
            <Route path="/" element={<FeedPage />} />
            <Route path="/search" element={<FeedPage />} />
            <Route path="/tag/:tag" element={<FeedPage />} />
            <Route path="/posts/:slug" element={<PostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
