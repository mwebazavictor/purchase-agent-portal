
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
  logout: () => void; // Changed from Promise<void> to void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");
  
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Restore user data from local storage
        setIsLoading(false);
        return;
      }
  
      if (token) {
        try {
          const userData = await userApi.getCurrentUser();
          
          if (userData.Company_id && !userData.company_id) {
            userData.company_id = userData.Company_id;
          }
  
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
  
        } catch (error) {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              await authApi.refreshToken(refreshToken);
              const userData = await userApi.getCurrentUser();
              
              if (userData.Company_id && !userData.company_id) {
                userData.company_id = userData.Company_id;
              }
  
              setUser(userData);
              localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
  
            } catch (refreshError) {
              localStorage.removeItem("authToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("user");
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
      
      // Normalize company_id if needed
      if (response.user.Company_id && !response.user.company_id) {
        response.user.company_id = response.user.Company_id;
      }
  
      // Save tokens and user data to local storage
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));
  
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
  

  // Frontend-only logout solution
  const logout = () => {
    // Clear user data
    setUser(null);
    
    // Clear tokens from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user")
    
    // Show success message
    toast.success("Logged out successfully");
    
    // Redirect to login page
    navigate("/login");
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
