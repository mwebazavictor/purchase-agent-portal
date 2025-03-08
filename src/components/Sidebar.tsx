
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  ShoppingBag, 
  Code, 
  MessageSquare,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/agents",
      name: "Agents",
      icon: <ShoppingBag size={20} />,
    },
    {
      path: "/sample-questions",
      name: "Sample Questions",
      icon: <MessageSquare size={20} />,
    },
    {
      path: "/implementation",
      name: "Implementation",
      icon: <Code size={20} />,
    },
  ];

  // Handle logout click
  const handleLogout = () => {
    logout(); // Call the frontend-only logout method
  };

  return (
    <div 
      className={cn(
        "h-screen glass-card border-r border-emerald-200/30 dark:border-emerald-800/30 transition-all duration-300 z-10 flex flex-col",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-emerald-200/30 dark:border-emerald-800/30">
        {!collapsed && (
          <h1 className="text-xl font-medium text-emerald-800 dark:text-emerald-300">TAI AGENT SUITE</h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-emerald-100/50 dark:hover:bg-emerald-800/50 transition-colors text-emerald-700 dark:text-emerald-400"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col gap-2 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                location.pathname === item.path 
                  ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                  : "text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30 hover:text-emerald-700 dark:hover:text-emerald-200"
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-emerald-200/30 dark:border-emerald-800/30 mt-auto">
        {!collapsed && (
          <div className="flex flex-col mb-4">
            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{user?.name}</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-500">{user?.email}</span>
          </div>
        )}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-100/30 dark:hover:bg-rose-900/20 transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
