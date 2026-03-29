import {
  ThemeToggleButton1,
  ThemeToggleButton2,
  ThemeToggleButton3,
  ThemeToggleButton4,
  ThemeToggleButton5,
} from "@/components/ui/theme-toggle-buttons";

export default function DemoSkiper4 () {
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <ThemeToggleButton1 className="h-12 w-12" />
      <ThemeToggleButton2 className="h-12 w-12" />
      <ThemeToggleButton3 className="h-12 w-12" />
      <ThemeToggleButton4 className="h-12 w-12" />
      <ThemeToggleButton5 className="h-12 w-12" />
    </div>
  );
};
