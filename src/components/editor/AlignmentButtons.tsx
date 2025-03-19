
import React from "react";
import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

interface AlignmentButtonsProps {
  handleAlignment: (alignment: string) => void;
}

const AlignmentButtons = ({ handleAlignment }: AlignmentButtonsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleAlignment('left')}
        className="h-8 w-8 p-0 rounded-md"
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleAlignment('center')}
        className="h-8 w-8 p-0 rounded-md"
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleAlignment('right')}
        className="h-8 w-8 p-0 rounded-md"
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => handleAlignment('justify')}
        className="h-8 w-8 p-0 rounded-md"
        title="Justify"
      >
        <AlignJustify className="h-4 w-4" />
      </Button>
    </>
  );
};

export default AlignmentButtons;
