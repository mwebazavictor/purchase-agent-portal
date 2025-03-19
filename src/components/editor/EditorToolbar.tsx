
import React from 'react';
import { FormatButtons } from './FormatButtons';
import { AlignmentButtons } from './AlignmentButtons';
import { ListButtons } from './ListButtons';
import { InsertButtons } from './InsertButtons';

interface EditorToolbarProps {
  editor: any;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 p-1 border border-input rounded-md bg-background sticky top-0 z-10">
      <FormatButtons editor={editor} />
      <AlignmentButtons editor={editor} />
      <ListButtons editor={editor} />
      <InsertButtons editor={editor} />
    </div>
  );
};

export default EditorToolbar;
