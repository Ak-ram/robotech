
import AdminCourses from "@/components/AdminCourses";
import AdminAbout from "@/components/AdminAbout";
import AdminFaq from "@/components/AdminFaq";
import AdminSlides from "@/components/AdminSlides";
import AdminAnnouncement from "@/components/AdminAnnouncement";
import AdminLocation from "@/components/AdminLocation";
import AdminBills from "@/components/AdminBills";
import Admin3DComponent from "@/components/Admin3DComponent";
import Stats from "@/components/Stats";
import AdminCustomers from "@/components/AdminCustomers";
import {
  BarChart,
  GraduationCap,
  HelpCircle,
  Key,
  LayoutList,
  Loader,
  Map,
  Menu,
  Paperclip,
  Printer,
  ScrollText,
  SlidersHorizontal,
  Smile,
  StickyNote,
  User,
  UserCircle,
  X,
} from "lucide-react";
import AdminProducts from "@/components/AdminProducts";
import { SidebarItem } from "../../type";


export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    icon: <LayoutList />,
    label: "Products",
    content: <AdminProducts />,
  },
  {
    id: 2,
    icon: <Printer />,
    label: "Services",
    content: <Admin3DComponent />,
  },
  {
    id: 3,
    icon: <GraduationCap />,
    label: "Courses",
    content: <AdminCourses />,
  },
  { id: 4, icon: <Smile />, label: "News", content: <AdminAbout /> },
  { id: 5, icon: <HelpCircle />, label: "Faq", content: <AdminFaq /> },
  {
    id: 6,
    icon: <SlidersHorizontal />,
    label: "Slides",
    content: <AdminSlides />,
  },
  {
    id: 7,
    icon: <StickyNote />,
    label: "Announcement",
    content: <AdminAnnouncement />,
  },
  { id: 8, icon: <Map />, label: "Location", content: <AdminLocation /> },
  {
    id: 9,
    icon: <UserCircle />,
    label: "Customers",
    content: <AdminCustomers />,
  },
  { id: 10, icon: <BarChart />, label: "Stats", content: <Stats /> },
  { id: 11, icon: <ScrollText />, label: "Bills", content: <AdminBills /> },
  // Add more items as needed
];