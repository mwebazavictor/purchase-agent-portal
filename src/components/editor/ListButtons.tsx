
import React from 'react';
import { Button } from "@/components/ui/button";
import { ListOrdered, ListChecks, Indent, Outdent, Quote } from "lucide-react";

interface ListButtonsProps {
  editor: any;
}

export const ListButtons = ({ editor }: ListButtonsProps) => {
  if (!editor) {
    return null;
  }

  const toggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const toggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const toggleTaskList = () => {
    editor.chain().focus().toggleTaskList().run();
  };

  const increaseIndent = () => {
    editor.chain().focus().indent().run();
  };

  const decreaseIndent = () => {
    editor.chain().focus().outdent().run();
  };

  const toggleBlockquote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
        onClick={toggleOrderedList}
        title="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
        onClick={toggleBulletList}
        title="Bullet List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 w-8 p-0 ${editor.isActive('taskList') ? 'bg-muted' : ''}`}
        onClick={toggleTaskList}
        title="Task List"
      >
        <ListChecks className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={increaseIndent}
        title="Increase Indent"
      >
        <Indent className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={decreaseIndent}
        title="Decrease Indent"
      >
        <Outdent className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-muted' : ''}`}
        onClick={toggleBlockquote}
        title="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Button>
    </div>
  );
};
