
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/lib/types";
import { authApi, userApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const userData = await userApi.getCurrentUser();
          // If API returns Company_id instead of company_id, normalize it
          if (userData.Company_id && !userData.company_id) {
            userData.company_id = userData.Company_id;
          }
          setUser(userData);
        } catch (error) {
          // Token might be expired, try to refresh
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              await authApi.refreshToken(refreshToken);
              const userData = await userApi.getCurrentUser();
              // If API returns Company_id instead of company_id, normalize it
              if (userData.Company_id && !userData.company_id) {
                userData.company_id = userData.Company_id;
              }
              setUser(userData);
            } catch (refreshError) {
              // Refresh failed, clear tokens
              localStorage.removeItem("authToken");
              localStorage.removeItem("refreshToken");
            }
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(email, password);
      // If API returns Company_id instead of company_id, normalize it
      if (response.user.Company_id && !response.user.company_id) {
        response.user.company_id = response.user.Company_id;
      }
      setUser(response.user);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
