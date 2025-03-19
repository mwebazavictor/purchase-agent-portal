
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CodeDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  codeContent: string;
  setCodeContent: (content: string) => void;
  codeLanguage: string;
  setCodeLanguage: (language: string) => void;
  handleInsertCode: () => void;
}

const CodeDialog = ({
  isOpen,
  setIsOpen,
  codeContent,
  setCodeContent,
  codeLanguage,
  setCodeLanguage,
  handleInsertCode,
}: CodeDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Insert Code Block</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="code-language">Language</Label>
            <select
              id="code-language"
              value={codeLanguage}
              onChange={(e) => setCodeLanguage(e.target.value)}
              className="w-full p-2 rounded-md border border-emerald-200 dark:border-emerald-800 bg-background"
            >
              <option value="javascript">JavaScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="go">Go</option>
              <option value="swift">Swift</option>
              <option value="typescript">TypeScript</option>
              <option value="sql">SQL</option>
              <option value="shell">Shell/Bash</option>
              <option value="plaintext">Plain Text</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="code-content">Code</Label>
            <Textarea
              id="code-content"
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              placeholder="Paste your code here..."
              className="font-mono h-[200px] border-emerald-200 dark:border-emerald-800"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleInsertCode}>
            Insert Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodeDialog;
