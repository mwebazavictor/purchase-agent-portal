
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-nature-gradient p-4 animate-fade-in">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-emerald-600 dark:text-emerald-400">404</h1>
        <h2 className="text-3xl font-medium text-emerald-800 dark:text-emerald-300">Page not found</h2>
        <p className="text-emerald-700 dark:text-emerald-500 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button onClick={() => navigate(-1)} className="mt-6 bg-emerald-600 hover:bg-emerald-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
