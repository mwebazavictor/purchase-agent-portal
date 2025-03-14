
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecipientListProps {
  recipients: string[];
  onRemove: (index: number) => void;
}

const RecipientList = ({ recipients, onRemove }: RecipientListProps) => {
  if (!recipients.length) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No recipients added yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium flex justify-between text-emerald-800 dark:text-emerald-300">
        <span>Recipients ({recipients.length})</span>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto">
        <ul className="space-y-1">
          {recipients.map((email, index) => (
            <li key={index} className="flex items-center justify-between gap-2 p-2 rounded-md bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
              <span className="text-sm truncate">{email}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500"
                onClick={() => onRemove(index)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipientList;
