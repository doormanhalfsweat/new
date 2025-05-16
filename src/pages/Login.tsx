
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { School } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-4">
      <div className="flex flex-col items-center mb-8">
        <School className="h-12 w-12 text-primary mb-2" />
        <h1 className="text-3xl font-bold">Campus Connect</h1>
        <p className="text-muted-foreground">Academic Calendar & Notice Board</p>
      </div>
      <LoginForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Academic Calendar and Notice Board System
        <br />
        © 2025 Campus Connect. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
