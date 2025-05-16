
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "@/components/auth/AuthGuard";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import NoticesPage from "./pages/Notices";
import ExamsPage from "./pages/Exams";
import HolidaysPage from "./pages/Holidays";
import SettingsPage from "./pages/Settings";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } 
            />
            
            <Route 
              path="/calendar" 
              element={
                <AuthGuard>
                  <CalendarPage />
                </AuthGuard>
              } 
            />
            
            <Route 
              path="/notices" 
              element={
                <AuthGuard>
                  <NoticesPage />
                </AuthGuard>
              } 
            />
            
            <Route 
              path="/exams" 
              element={
                <AuthGuard>
                  <ExamsPage />
                </AuthGuard>
              } 
            />
            
            <Route 
              path="/holidays" 
              element={
                <AuthGuard>
                  <HolidaysPage />
                </AuthGuard>
              } 
            />
            
            <Route 
              path="/settings" 
              element={
                <AuthGuard allowedRoles={['admin']}>
                  <SettingsPage />
                </AuthGuard>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
