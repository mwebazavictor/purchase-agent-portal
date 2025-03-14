
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Image, Subscript, Superscript, Link as LinkIcon, ListOrdered, List,
  Code, FileCode, Strikethrough, Indent, Outdent, Quote, Table,
  SplitSquareVertical, Divide, File, Type
} from "lucide-react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import ColorPicker from "@/components/ColorPicker";
import EmojiPicker from "@/components/EmojiPicker";
import FormatButtons from "./FormatButtons";
import AlignmentButtons from "./AlignmentButtons";
import ListButtons from "./ListButtons";
import InsertButtons from "./InsertButtons";

interface EditorToolbarProps {
  execFormatCommand: (command: string, value?: string) => void;
  handleAlignment: (alignment: string) => void;
  handleFormat: (format: string) => void;
  handleTextColor: (color: string) => void;
  handleBackgroundColor: (color: string) => void;
  handleEmojiSelect: (emoji: string) => void;
  setIsTableDialogOpen: (isOpen: boolean) => void;
  setIsCodeDialogOpen: (isOpen: boolean) => void;
  handleInsertInlineCode: () => void;
  handleInsertHorizontalLine: () => void;
  setIsColumnsDialogOpen: (isOpen: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  generalFileInputRef: React.RefObject<HTMLInputElement>;
  handleFileAttachment: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditorToolbar = ({
  execFormatCommand,
  handleAlignment,
  handleFormat,
  handleTextColor,
  handleBackgroundColor,
  handleEmojiSelect,
  setIsTableDialogOpen,
  setIsCodeDialogOpen,
  handleInsertInlineCode,
  handleInsertHorizontalLine,
  setIsColumnsDialogOpen,
  fileInputRef,
  generalFileInputRef,
  handleFileAttachment
}: EditorToolbarProps) => {
  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 border-b border-emerald-200 dark:border-emerald-800 flex flex-wrap gap-2">
      {/* Text Formatting Buttons */}
      <FormatButtons handleFormat={handleFormat} />
      
      <div className="h-6 w-px bg-emerald-200 dark:bg-emerald-700 mx-1"></div>
      
      {/* Color Pickers */}
      <ColorPicker onSelectColor={handleTextColor} title="Text Color" />
      <ColorPicker onSelectColor={handleBackgroundColor} isBackgroundColor={true} title="Background Color" />
      
      <div className="h-6 w-px bg-emerald-200 dark:bg-emerald-700 mx-1"></div>
      
      {/* Alignment Buttons */}
      <AlignmentButtons handleAlignment={handleAlignment} />
      
      <div className="h-6 w-px bg-emerald-200 dark:bg-emerald-700 mx-1"></div>
      
      {/* List Buttons */}
      <ListButtons handleFormat={handleFormat} />

      {/* Insert Media, Links, etc. */}
      <InsertButtons
        execFormatCommand={execFormatCommand}
        fileInputRef={fileInputRef}
        generalFileInputRef={generalFileInputRef}
        handleFileAttachment={handleFileAttachment}
      />

      {/* Additional formatting options in a dropdown */}
      <Menubar className="h-8 border-0 bg-transparent p-0">
        <MenubarMenu>
          <MenubarTrigger className="h-8 px-2 rounded-md flex items-center gap-1 focus:bg-emerald-100 dark:focus:bg-emerald-800/40">
            <Type className="h-4 w-4" />
            <span className="text-xs">More</span>
          </MenubarTrigger>
          <MenubarContent className="min-w-[180px]">
            {/* Table */}
            <MenubarItem
              onClick={() => setIsTableDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Table className="h-4 w-4" />
              <span>Insert Table</span>
            </MenubarItem>
            
            {/* Code Block */}
            <MenubarItem
              onClick={() => setIsCodeDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <FileCode className="h-4 w-4" />
              <span>Code Block</span>
            </MenubarItem>
            
            {/* Inline Code */}
            <MenubarItem
              onClick={handleInsertInlineCode}
              className="flex items-center gap-2"
            >
              <Code className="h-4 w-4" />
              <span>Inline Code</span>
            </MenubarItem>
            
            {/* Horizontal Line */}
            <MenubarItem
              onClick={handleInsertHorizontalLine}
              className="flex items-center gap-2"
            >
              <Divide className="h-4 w-4" />
              <span>Horizontal Line</span>
            </MenubarItem>
            
            {/* Columns */}
            <MenubarItem
              onClick={() => setIsColumnsDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <SplitSquareVertical className="h-4 w-4" />
              <span>Columns Layout</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {/* Emoji Picker */}
      <EmojiPicker onEmojiSelect={handleEmojiSelect} />
    </div>
  );
};

export default EditorToolbar;
