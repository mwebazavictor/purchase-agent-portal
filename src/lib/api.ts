
import { toast } from "sonner";
import { 
  User, 
  Company, 
  Agent, 
  PurchasedAgent, 
  Query,
  AuthResponse,
  RegisterData
} from "./types";

const API_BASE_URL = "https://multi-agents-production-aace.up.railway.app/api/v1";

// Helper function to handle API errors
const handleApiError = (error: any) => {
  console.error("API Error:", error);
  const message = error?.response?.data?.message || error?.message || "An unexpected error occurred";
  toast.error(message);
  return Promise.reject(error);
};

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Helper function to make authenticated API requests
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || "API request failed");
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Auth APIs
export const authApi = {
  login: async (email: string, password: string): Promise<any> => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    
    // Store tokens in localStorage
    localStorage.setItem("authToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    
    return {
      user: data.user,
      token: data.accessToken,
      refreshToken: data.refreshToken
    };
  },
  
  refreshToken: async (refreshToken: string) => {
    const data = await apiFetch("/auth/token", {
      method: "POST",
      body: JSON.stringify({ token: refreshToken }),
    });
    
    localStorage.setItem("authToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    
    return data;
  },
  
  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await apiFetch("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ token: refreshToken }),
      });
    }
    
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  },
};

// User APIs
export const userApi = {
  getCurrentUser: async (): Promise<User> => {
    return apiFetch("/users/me");
  },
  
  getUsers: async (): Promise<User[]> => {
    return apiFetch("/users");
  },
  
  getUser: async (id: string): Promise<User> => {
    return apiFetch(`/users/${id}`);
  },
  
  createUser: async (userData: Partial<User>): Promise<User> => {
    return apiFetch("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
};

// Company APIs
export const companyApi = {
  getCompany: async (id: string): Promise<Company> => {
    return apiFetch(`/company/${id}`);
  },
  
  createCompany: async (registerData: RegisterData): Promise<any> => {
    return fetch(`${API_BASE_URL}/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || "Registration failed");
      }
      return response.json();
    }).catch(error => {
      return handleApiError(error);
    });
  },
};

// Agent APIs
export const agentApi = {
  getAgents: async (): Promise<Agent[]> => {
    return apiFetch("/agents");
  },
  
  getAgent: async (id: string): Promise<Agent> => {
    return apiFetch(`/agents/${id}`);
  },
};

// Purchased Agent APIs
export const purchasedAgentApi = {
  getPurchasedAgents: async (companyId: string): Promise<any> => {
    return apiFetch(`/purchasedagents/withcompayid/${companyId}`);
  },
  
  getPurchasedAgent: async (id: string): Promise<PurchasedAgent> => {
    return apiFetch(`/purchasedagents/${id}`);
  },
  
  purchaseAgent: async (data: {
    company_id: string;
    plan: string;
    amount: string;
    period: number;
    agent_id: string;
  }): Promise<PurchasedAgent> => {
    return apiFetch("/purchasedagents/withacount", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Query APIs
export const queryApi = {
  getQueries: async (purchasedAgentId: string): Promise<Query[]> => {
    return apiFetch(`/customerSupportQuery/withpurhasedid/${purchasedAgentId}`);
  },
  
  createQuery: async (data: {
    query: string;
    company_id: string;
    agent_id: string;
    purchased_agent_id: string;
  }): Promise<Query> => {
    return apiFetch("/customerSupportQuery", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  
  updateQuery: async (id: string, data: { query: string }): Promise<Query> => {
    return apiFetch(`/customerSupportQuery/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  
  deleteQuery: async (id: string): Promise<void> => {
    return apiFetch(`/customerSupportQuery/${id}`, {
      method: "DELETE",
    });
  },
};

export const pdfApi = {
  uploadPdf: async (data: {
    document: string;
    user_id: string;
    company_id: string;
  }): Promise<any> => {
    return apiFetch("/upload", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Email APIs
export const emailApi = {
  sendEmail: async (data: {
    sender: string;
    recipients: string[];
    subject: string;
    htmlContent: string;
  }): Promise<any> => {
    return apiFetch("/emails/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  
  getEmails: async (companyId: string): Promise<any[]> => {
    return apiFetch(`/emails/company/${companyId}`);
  },
  
  getEmail: async (id: string): Promise<any> => {
    return apiFetch(`/emails/${id}`);
  },
};
