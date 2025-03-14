import { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  onSelectColor: (color: string) => void;
  initialColor?: string;
  className?: string;
  isBackgroundColor?: boolean;
  title?: string;
}

const ColorPicker = ({ 
  onSelectColor, 
  initialColor = '#000000', 
  className,
  isBackgroundColor = false,
  title
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const colors = [
    '#000000', '#5C5C5C', '#8E8E8E', '#C3C3C3', '#FFFFFF',
    '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
    '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6',
    '#6366F1', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onSelectColor(color);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={colorPickerRef}>
      <button
        type="button"
        className={cn(
          "w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center",
          isBackgroundColor ? "bg-emerald-50 dark:bg-emerald-900/30" : ""
        )}
        onClick={() => setIsOpen(!isOpen)}
        title={title || (isBackgroundColor ? "Background Color" : "Text Color")}
      >
        <div 
          className="w-5 h-5 rounded-sm" 
          style={{ backgroundColor: selectedColor }}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className="w-6 h-6 rounded-md border border-gray-300 dark:border-gray-600 transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => handleColorSelect(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
