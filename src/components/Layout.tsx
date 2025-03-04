
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div className="animate-fade-in">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 transition-all duration-300 animate-fade-in">
        {children}
      </main>
    </div>
  );
};

export default Layout;
