
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { FormatButtons } from "./FormatButtons";
import { AlignmentButtons } from "./AlignmentButtons";
import { ListButtons } from "./ListButtons";
import { InsertButtons } from "./InsertButtons";
import { ColorPicker } from "./ColorPicker";
import type { Editor } from '@tiptap/react';

interface EditorToolbarProps {
  editor: Editor | null;
  setShowCodeDialog: (show: boolean) => void;
  setShowColumnsDialog: (show: boolean) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  setShowCodeDialog,
  setShowColumnsDialog
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-background rounded-md p-1 flex flex-wrap gap-1 items-center">
      <FormatButtons editor={editor} />
      <Separator orientation="vertical" className="h-8" />
      <AlignmentButtons editor={editor} />
      <Separator orientation="vertical" className="h-8" />
      <ListButtons editor={editor} />
      <Separator orientation="vertical" className="h-8" />
      <InsertButtons 
        editor={editor} 
        onCodeClick={() => setShowCodeDialog(true)}
        onColumnsClick={() => setShowColumnsDialog(true)}
      />
      <Separator orientation="vertical" className="h-8" />
      <ColorPicker editor={editor} />
    </div>
  );
};

export default EditorToolbar;
