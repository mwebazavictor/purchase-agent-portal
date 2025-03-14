
import React from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, Strikethrough, Subscript, Superscript } from "lucide-react";

interface FormatButtonsProps {
  handleFormat: (format: string) => void;
}

const FormatButtons = ({ handleFormat }: FormatButtonsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleFormat('bold')}
        className="h-8 w-8 p-0 rounded-md"
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleFormat('italic')}
        className="h-8 w-8 p-0 rounded-md"
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleFormat('underline')}
        className="h-8 w-8 p-0 rounded-md"
        title="Underline"
      >
        <Underline className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleFormat('strikeThrough')}
        className="h-8 w-8 p-0 rounded-md"
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleFormat('subscript')}
        className="h-8 w-8 p-0 rounded-md"
        title="Subscript"
      >
        <Subscript className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleFormat('superscript')}
        className="h-8 w-8 p-0 rounded-md"
        title="Superscript"
      >
        <Superscript className="h-4 w-4" />
      </Button>
    </>
  );
};

export default FormatButtons;
