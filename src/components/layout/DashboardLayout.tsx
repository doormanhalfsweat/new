
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CalendarCheck, CalendarDays, Bell, FileText, School, LogOut, Settings, Menu, User, } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: School },
    { title: 'Calendar', path: '/calendar', icon: CalendarDays },
    { title: 'Notice Board', path: '/notices', icon: Bell },
    { title: 'Exam Schedule', path: '/exams', icon: FileText },
    { title: 'Holidays', path: '/holidays', icon: CalendarCheck },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <div className="px-3 py-4">
            <div className="flex items-center mb-8 px-2">
              <School className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">Campus Connect</span>
            </div>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={isActive(item.path) ? 'bg-sidebar-accent' : ''}>
                        <Link to={item.path}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  
                  {user?.role === 'admin' && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className={isActive('/settings') ? 'bg-sidebar-accent' : ''}>
                        <Link to="/settings">
                          <Settings className="h-5 w-5" />
                          <span>Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <div className="mt-auto px-3 py-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-start px-2 py-6">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Sidebar>
        
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 border-b flex items-center px-6 sticky top-0 z-10 bg-background">
            <SidebarTrigger />
            <div className="flex-1 flex justify-between items-center">
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
              <div className="ml-auto">
                {/* Optional header elements like notifications */}
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
          
          <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 Academic Calendar and Notice Board System</p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
