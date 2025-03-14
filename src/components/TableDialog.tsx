
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertTable: (rows: number, cols: number) => void;
}

const TableDialog = ({ isOpen, onClose, onInsertTable }: TableDialogProps) => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

  const handleInsert = () => {
    if (rows > 0 && cols > 0) {
      onInsertTable(rows, cols);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Table</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rows">Rows</Label>
              <Input
                id="rows"
                type="number"
                min="1"
                max="20"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                className="border-emerald-200 dark:border-emerald-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cols">Columns</Label>
              <Input
                id="cols"
                type="number"
                min="1"
                max="10"
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                className="border-emerald-200 dark:border-emerald-800"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleInsert}>Insert Table</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TableDialog;
