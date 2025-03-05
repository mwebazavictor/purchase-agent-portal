
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { companyApi } from "@/lib/api";
import { RegisterData } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";

// List of country codes
const countryCodes = [
  { code: "+256", country: "Uganda" },
  { code: "+254", country: "Kenya" },
  { code: "+255", country: "Tanzania" },
  { code: "+250", country: "Rwanda" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+27", country: "South Africa" },
  { code: "+234", country: "Nigeria" },
  { code: "+20", country: "Egypt" },
];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyname: "",
    companyemail: "",
    companylocation: "",
    industry: "",
    name: "",
    email: "",
    password: "",
    phoneCode: "+256",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Format phone number with country code
    const phone = `${formData.phoneCode}${formData.phoneNumber}`;

    try {
      const registerData: RegisterData = {
        companyname: formData.companyname.trim(),
        companyemail: formData.companyemail.trim(),
        companylocation: formData.companylocation.trim(),
        industry: formData.industry.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: phone,
        role: "admin" // Role is automatically set to admin
      };

      await companyApi.createCompany(registerData);
      toast.success("Registration successful! Please log in.");
      
      // Auto-login the user
      await login(formData.email, formData.password);
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please check your information and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Tubayo Business Support</h1>
          <p className="text-muted-foreground">Create your account to get started</p>
        </div>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Fill in the details to create your business account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Company Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="companyname">Company Name</Label>
                  <Input
                    id="companyname"
                    name="companyname"
                    placeholder="Tubayo Ltd"
                    value={formData.companyname}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyemail">Company Email</Label>
                  <Input
                    id="companyemail"
                    name="companyemail"
                    type="email"
                    placeholder="info@tubayo.com"
                    value={formData.companyemail}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companylocation">Company Location</Label>
                  <Input
                    id="companylocation"
                    name="companylocation"
                    placeholder="Kampala, Uganda"
                    value={formData.companylocation}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    placeholder="Software & Technology"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Admin Account</h3>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@tubayo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.phoneCode}
                      onValueChange={(value) => handleSelectChange("phoneCode", value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.country} ({country.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="772123456"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:underline">
                  Sign in
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
