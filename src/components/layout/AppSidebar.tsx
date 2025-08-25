import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  DollarSign,
  Calendar,
  Bell,
  BarChart3,
  Settings,
  User,
  CreditCard,
  Clock,
  FileText,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface AppSidebarProps {
  onNavigate?: () => void;
}

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    color: "text-primary",
  },
  {
    title: "Finanças",
    href: "/finance",
    icon: DollarSign,
    color: "text-success",
  },
  {
    title: "Agenda",
    href: "/schedule",
    icon: Calendar,
    color: "text-secondary",
  },
  {
    title: "Lembretes",
    href: "/reminders",
    icon: Bell,
    color: "text-accent",
  },
  {
    title: "Relatórios",
    href: "/reports",
    icon: BarChart3,
    color: "text-warning",
  },
];

const secondaryItems = [
  {
    title: "Perfil",
    href: "/profile",
    icon: User,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];

export const AppSidebar = ({ onNavigate }: AppSidebarProps) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkIfAdmin();
  }, [user]);

  const checkIfAdmin = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    setIsAdmin(!!data);
  };
  return (
    <aside className="h-full bg-card border-r flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">Assistente</h2>
            <p className="text-xs text-muted-foreground">WhatsApp Manager</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  "hover:bg-muted",
                  isActive && "bg-muted text-primary shadow-sm"
                )
              }
            >
              <item.icon className={cn("h-5 w-5", item.color)} />
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t">
        <nav className="space-y-1">
          {secondaryItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  "hover:bg-muted",
                  isActive && "bg-muted text-primary"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  "hover:bg-muted",
                  isActive && "bg-muted text-primary"
                )
              }
            >
              <Shield className="h-5 w-5 text-warning" />
              Administração
            </NavLink>
          )}
        </nav>

        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">Plano Pro</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Mensagens</span>
              <span className="font-medium">850/1000</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mt-1">
              <div
                className="gradient-primary h-1.5 rounded-full"
                style={{ width: "85%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};