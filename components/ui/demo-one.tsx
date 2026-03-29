import {
  ExpandableTabs,
  type TabItem,
} from "@/components/ui/expandable-tabs-1";

import { Zap, User, Sparkles, Mail } from "lucide-react";


const DemoOne = () => {
  const tabs: TabItem[] = [
    {
      id: "important",
      icon: Zap,
      label: "Important",
      color: "bg-blue-600",
    },
    {
      id: "profile",
      icon: User,
      label: "Profile",
      color: "bg-pink-500",
    },
    {
      id: "features",
      icon: Sparkles,
      label: "Features",
      color: "bg-pink-600",
    },
    {
      id: "messages",
      icon: Mail,
      label: "Messages",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <ExpandableTabs tabs={tabs} defaultTabId="important" />
    </div>
  );
};

export { DemoOne };
