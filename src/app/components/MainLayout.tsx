import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  Home,
  Plus,
  Database,
  Users,
  Building2,
  Shield,
  Image as ImageIcon,
  CreditCard,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Bot,
  Puzzle
} from 'lucide-react';
import logoImg from '../../assets/c7019ab930c36b5953f155a225e5dc6b8936e3f5.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface MainLayoutProps {
  children: ReactNode;
}

// 导航菜单项配置
const navigationItems = [
  { icon: Home, label: '工作台', path: '/', badge: null },
  { icon: Database, label: '知识库', path: '/knowledge-base', badge: null },
  { icon: ImageIcon, label: '素材库', path: '/assets', badge: null },
  { icon: Users, label: '客户数据平台', path: '/customer-data', badge: null },
  { icon: Bot, label: 'AgentHub', path: '/agenthub', badge: null },
  { icon: Puzzle, label: '应用中心', path: '/app-center', badge: null },
  { icon: Building2, label: '组织管理', path: '/organization', badge: null },
  { icon: Shield, label: '权限管理', path: '/permissions', badge: null },
];

// 模拟用户信息
const currentUser = {
  name: '王晓明',
  email: 'wangxiaoming@ringdigital.com',
  role: '管理员',
  avatar: '',
  plan: 'Enterprise',
};

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Top Header - Full Width */}
      <header className="border-b bg-card sticky top-0 z-40 w-full">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Logo and Brand */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <img src={logoImg} alt="Logo" className="h-8 w-auto" />
            <div>
              <div className="font-semibold">Agenthub</div>
              <div className="text-xs text-muted-foreground">从工具到伙伴 全链路营销服智能体平台</div>
            </div>
          </div>

          {/* Right: Notification Center + User Info */}
          <div className="flex items-center gap-3">
            {/* Notification Center */}
            <Link
              to="/notifications"
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                location.pathname === '/notifications'
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <Bell className="w-5 h-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Link>

            {/* User Info */}
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium">{currentUser.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.role}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                  <Badge variant="outline" className="w-fit mt-1">
                    {currentUser.plan}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/user" className="flex items-center">
                  <User className="mr-2 w-4 h-4" />
                  个人资料
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/billing" className="flex items-center">
                  <CreditCard className="mr-2 w-4 h-4" />
                  账户额度
                  <Badge variant="secondary" className="ml-auto text-xs">Pro</Badge>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Settings className="mr-2 w-4 h-4" />
                  账户设置
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 w-4 h-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Middle Section - Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={cn(
            "fixed top-[57px] left-0 z-30 h-[calc(100vh-57px-53px)] w-64 bg-card border-r flex flex-col transition-transform lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4 pt-6">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted text-foreground"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1 text-sm">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "secondary" : "default"} 
                        className="text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-[calc(100vh-57px-53px)]">
          {children}
        </main>
      </div>

      {/* Bottom Footer - Full Width */}
      <footer className="border-t bg-card w-full">
        <div className="px-6 py-4">
          <div className="text-xs text-muted-foreground text-center">
            © 2026 径硕科技 JINGDIGITAL. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}