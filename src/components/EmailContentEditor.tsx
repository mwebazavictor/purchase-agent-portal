
import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import EditorToolbar from "./editor/EditorToolbar";
import TableDialog from "./TableDialog";
import CodeDialog from "./editor/CodeDialog";
import ColumnsDialog from "./editor/ColumnsDialog";

interface EmailContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailContentEditor = ({ value, onChange }: EmailContentEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState("");
  
  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const generalFileInputRef = useRef<HTMLInputElement>(null);
  
  // Dialog states
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
  const [codeContent, setCodeContent] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const [isColumnsDialogOpen, setIsColumnsDialogOpen] = useState(false);
  const [columnCount, setColumnCount] = useState(2);

  // Handle formatting commands
  const execFormatCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    
    if (editorRef.current) {
      // Update state with HTML content
      const newContent = editorRef.current.innerHTML;
      setEditorState(newContent);
      onChange(newContent);
    }
    
    // Refocus the editor
    editorRef.current?.focus();
  }, [onChange]);

  // Handle toolbar button clicks
  const handleFormat = (format: string, value?: string) => {
    execFormatCommand(format, value);
  };

  // Handle alignment changes
  const handleAlignment = (alignment: string) => {
    const alignmentCommands = {
      'left': 'justifyLeft',
      'center': 'justifyCenter',
      'right': 'justifyRight',
      'justify': 'justifyFull'
    };
    
    if (alignment in alignmentCommands) {
      execFormatCommand(alignmentCommands[alignment as keyof typeof alignmentCommands]);
    }
  };

  // Handle content change
  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setEditorState(newContent);
      onChange(newContent);
    }
  };

  // Handle file attachment
  const handleFileAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload the file to a server
      // and then insert a link or placeholder
      const fileIcon = getFileIcon(file.name);
      const fileHtml = `<div class="file-attachment" style="display: flex; align-items: center; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; background-color: #f9f9f9;">
        <span style="margin-right: 8px;">${fileIcon}</span>
        <span style="flex-grow: 1;">${file.name} (${formatFileSize(file.size)})</span>
      </div>`;
      
      execFormatCommand('insertHTML', fileHtml);
      toast.success(`File "${file.name}" attached`);
    }
  };

  // Handle table insertion
  const handleInsertTable = (rows: number, cols: number) => {
    let tableHtml = '<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">';
    
    // Create header row
    tableHtml += '<thead><tr>';
    for (let j = 0; j < cols; j++) {
      tableHtml += '<th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">Header ' + (j + 1) + '</th>';
    }
    tableHtml += '</tr></thead><tbody>';
    
    // Create data rows
    for (let i = 0; i < rows - 1; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < cols; j++) {
        tableHtml += '<td style="border: 1px solid #ccc; padding: 8px;">Cell ' + (i + 1) + '-' + (j + 1) + '</td>';
      }
      tableHtml += '</tr>';
    }
    
    tableHtml += '</tbody></table>';
    execFormatCommand('insertHTML', tableHtml);
  };

  // Handle code block insertion
  const handleInsertCode = () => {
    const formattedCode = codeContent
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
    
    const codeHtml = `<pre style="background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 4px; padding: 12px; font-family: monospace; overflow-x: auto; margin: 10px 0;"><code class="language-${codeLanguage}">${formattedCode}</code></pre>`;
    execFormatCommand('insertHTML', codeHtml);
    setCodeContent("");
    setIsCodeDialogOpen(false);
  };

  // Handle inline code insertion
  const handleInsertInlineCode = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const selectionText = selection.toString();
      const inlineCodeHtml = `<code style="background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 3px; padding: 2px 4px; font-family: monospace;">${selectionText}</code>`;
      execFormatCommand('insertHTML', inlineCodeHtml);
    } else {
      toast.info("Please select some text to format as inline code");
    }
  };

  // Handle horizontal line insertion
  const handleInsertHorizontalLine = () => {
    execFormatCommand('insertHTML', '<hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">');
  };

  // Handle multi-column layout insertion
  const handleInsertColumns = () => {
    let columnsHtml = `<div style="display: flex; gap: 20px; margin: 15px 0;">`;
    
    for (let i = 0; i < columnCount; i++) {
      columnsHtml += `<div style="flex: 1;">
        <p>Column ${i + 1} content. Replace this with your content.</p>
      </div>`;
    }
    
    columnsHtml += `</div>`;
    execFormatCommand('insertHTML', columnsHtml);
    setIsColumnsDialogOpen(false);
  };

  // Handle color selection
  const handleTextColor = (color: string) => {
    execFormatCommand('foreColor', color);
  };

  // Handle background color
  const handleBackgroundColor = (color: string) => {
    execFormatCommand('hiliteColor', color);
  };

  // Handle emoji insertion
  const handleEmojiSelect = (emoji: string) => {
    execFormatCommand('insertText', emoji);
  };

  // Helper functions
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return '📄';
      case 'doc': case 'docx': return '📝';
      case 'xls': case 'xlsx': return '📊';
      case 'ppt': case 'pptx': return '📋';
      case 'zip': case 'rar': return '🗜️';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return '🖼️';
      default: return '📎';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="border border-emerald-200 dark:border-emerald-800 rounded-md overflow-hidden">
      {/* Main Toolbar */}
      <EditorToolbar 
        execFormatCommand={execFormatCommand}
        handleAlignment={handleAlignment}
        handleFormat={handleFormat}
        handleTextColor={handleTextColor}
        handleBackgroundColor={handleBackgroundColor}
        handleEmojiSelect={handleEmojiSelect}
        setIsTableDialogOpen={setIsTableDialogOpen}
        setIsCodeDialogOpen={setIsCodeDialogOpen}
        handleInsertInlineCode={handleInsertInlineCode}
        handleInsertHorizontalLine={handleInsertHorizontalLine}
        setIsColumnsDialogOpen={setIsColumnsDialogOpen}
        fileInputRef={fileInputRef}
        generalFileInputRef={generalFileInputRef}
        handleFileAttachment={handleFileAttachment}
      />
      
      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleContentChange}
        className={cn(
          "min-h-[200px] p-4 focus:outline-none prose prose-emerald max-w-none",
          "prose-headings:text-emerald-800 dark:prose-headings:text-emerald-300",
          "prose-p:text-gray-700 dark:prose-p:text-gray-300"
        )}
        style={{ direction: "ltr" }} /* Explicitly set left-to-right text direction */
        dir="ltr" /* HTML attribute for text direction */
      ></div>

      {/* Table Dialog */}
      <TableDialog
        isOpen={isTableDialogOpen}
        onClose={() => setIsTableDialogOpen(false)}
        onInsertTable={handleInsertTable}
      />

      {/* Code Block Dialog */}
      <CodeDialog
        isOpen={isCodeDialogOpen}
        setIsOpen={setIsCodeDialogOpen}
        codeContent={codeContent}
        setCodeContent={setCodeContent}
        codeLanguage={codeLanguage}
        setCodeLanguage={setCodeLanguage}
        handleInsertCode={handleInsertCode}
      />

      {/* Columns Dialog */}
      <ColumnsDialog
        isOpen={isColumnsDialogOpen}
        setIsOpen={setIsColumnsDialogOpen}
        columnCount={columnCount}
        setColumnCount={setColumnCount}
        handleInsertColumns={handleInsertColumns}
      />
    </div>
  );
};

export default EmailContentEditor;
