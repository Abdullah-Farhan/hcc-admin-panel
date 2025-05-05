import { House, Users, DollarSign, Medal, FileText } from "lucide-react";

export const sidebarLinks = {
  title: "Main",
  items: [
    {
      label: "Dashboard",
      icon: House,
      active: true,
      path:"/dashboard"
    },
    {
      label: "Member Progress",
      icon: Users,
      active: false,
      path:"/member-progress"
    },
    {
      label: "Rent Tracker",
      icon: DollarSign,
      active: false,
      path:"/rent-tracker"
    },
    {
      label: "Event Tracking",
      icon: Medal,
      active: false,
      path:"/event-tracking"
    },
    {
      label: "Resources",
      icon: FileText,
      active: false,
      path:"/resources"
    },
  ],
};