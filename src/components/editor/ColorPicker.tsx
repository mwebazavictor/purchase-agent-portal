
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Paintbrush, Type } from "lucide-react";
import type { Editor } from '@tiptap/react';

interface ColorPickerProps {
  onSelectColor: (color: string) => void;
  isBackgroundColor?: boolean;
  editor?: Editor;
}

const COLORS = [
  "#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff",
  "#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff",
  "#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc",
];

export const ColorPicker = ({ onSelectColor, isBackgroundColor = false, editor }: ColorPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-md"
          title={isBackgroundColor ? "Background Color" : "Text Color"}
        >
          {isBackgroundColor ? (
            <Paintbrush className="h-4 w-4" />
          ) : (
            <Type className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid grid-cols-10 gap-1">
          {COLORS.map((color) => (
            <button
              key={color}
              className="w-5 h-5 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: color }}
              onClick={() => onSelectColor(color)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
