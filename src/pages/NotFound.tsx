
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4 animate-fade-in">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-medium">Page not found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button onClick={() => navigate(-1)} className="mt-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
