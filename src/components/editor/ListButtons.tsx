
import React from "react";
import { Button } from "@/components/ui/button";
import { List, ListOrdered, Indent, Outdent, Quote } from "lucide-react";

interface ListButtonsProps {
  handleFormat: (format: string) => void;
}

const ListButtons = ({ handleFormat }: ListButtonsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleFormat('insertUnorderedList')}
        className="h-8 w-8 p-0 rounded-md"
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleFormat('insertOrderedList')}
        className="h-8 w-8 p-0 rounded-md"
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      {/* Indentation Buttons */}
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleFormat('indent')}
        className="h-8 w-8 p-0 rounded-md"
        title="Increase Indent"
      >
        <Indent className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleFormat('outdent')}
        className="h-8 w-8 p-0 rounded-md"
        title="Decrease Indent"
      >
        <Outdent className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => {
          handleFormat('formatBlock', '<blockquote>');
        }}
        className="h-8 w-8 p-0 rounded-md"
        title="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Button>
    </>
  );
};

export default ListButtons;
