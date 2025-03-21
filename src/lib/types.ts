// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "developer";
  company_id: string;
  Company_id?: string; // Added for compatibility with API response
}

export interface Company {
  id: string;
  companyname: string;
  companyemail: string;
  companylocation: string;
  industry: string;
}

export interface Agent {
  _id: string;
  name: string;
  description: string;
  title: string;
  status: string;
}

export interface PurchasedAgent {
  id: string;
  _id?: string; // Added for API compatibility
  company_id: string;
  plan: "free" | "enterprise";
  amount: number;
  period: number; 
  agent_id: string;
  createdAt: string;
  expiresAt: string;
  agent?: Agent;
  name?: string; // Added for API compatibility
}

export interface Query {
  _id: string;
  id: string;
  query: string;
  company_id: string;
  agent_id: string;
  purchased_agent_id: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterData {
  companyname: string;
  companyemail: string;
  companylocation: string;
  industry: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin";
}
