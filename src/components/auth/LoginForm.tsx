
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers } from '@/data/mockData';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: string) => {
    setIsLoading(true);
    const demoUser = mockUsers.find(user => user.role === role);
    
    if (demoUser) {
      setEmail(demoUser.email);
      setPassword('password');
      
      try {
        await login(demoUser.email, 'password');
        navigate('/dashboard');
      } catch (error) {
        console.error('Demo login failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center w-full">
          <p className="text-sm text-muted-foreground mb-2">Quick Demo Logins</p>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDemoLogin('admin')}
              disabled={isLoading}
            >
              Admin
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDemoLogin('teacher')}
              disabled={isLoading}
            >
              Teacher
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDemoLogin('student')}
              disabled={isLoading}
            >
              Student
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Password: "password"</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
