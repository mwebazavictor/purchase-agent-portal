
import { useState } from "react";
import { emojiCategories } from "@/utils/emojiData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        title="Insert Emoji"
      >
        <Smile className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-64">
          <Tabs defaultValue={emojiCategories[0].name} className="w-full">
            <TabsList className="grid grid-cols-7 h-9">
              {emojiCategories.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name}
                  className="p-0"
                  title={category.name}
                >
                  {category.emojis[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {emojiCategories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="mt-0">
                <ScrollArea className="h-40">
                  <div className="grid grid-cols-7 gap-1 p-2">
                    {category.emojis.map((emoji) => (
                      <button
                        key={emoji}
                        className="text-xl h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => handleEmojiClick(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
