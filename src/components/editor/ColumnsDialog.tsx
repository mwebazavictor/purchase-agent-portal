
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColumnsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  columnCount: number;
  setColumnCount: (count: number) => void;
  handleInsertColumns: () => void;
}

const ColumnsDialog = ({
  isOpen,
  setIsOpen,
  columnCount,
  setColumnCount,
  handleInsertColumns,
}: ColumnsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Column Layout</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="column-count">Number of Columns</Label>
            <Input
              id="column-count"
              type="number"
              min="2"
              max="4"
              value={columnCount}
              onChange={(e) => setColumnCount(Math.max(2, Math.min(4, parseInt(e.target.value) || 2)))}
              className="border-emerald-200 dark:border-emerald-800"
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-4">
            {Array.from({ length: columnCount }).map((_, i) => (
              <div 
                key={i} 
                className="flex-1 border border-dashed border-emerald-300 dark:border-emerald-600 h-20 rounded-md flex items-center justify-center text-emerald-600 dark:text-emerald-400"
              >
                Column {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleInsertColumns}>
            Insert Columns
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnsDialog;
