import { Calendar, ChevronRight, Home, Inbox, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger
} from "../ui/sidebar"

import { Link, usePage } from "@inertiajs/react"
import { buttonVariants } from "../ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { UserRole } from "@/shared/types/global"
import { cn } from "@/shared/lib/utils"

interface SidebarItem {
  title: "Overview" | "Request" | "Profile" | "Vehicle Management" | "Request Management" | "Request Vehicle" | "Request Approval"
  url?: string
  icon?: React.FC
  isActive?: boolean
  items?: SidebarItem[] | []
}

const roleSidebarItems: Record<UserRole, string[]> = {
  admin: ["Overview", "Request", "Profile", "Vehicle Management", "Request Vehicle", "Request Management", "Request Approval"],
  employee: ["Overview", "Profile", "Request", "Request Vehicle"],
  approver: ["Overview", "Request", "Profile", "Request Management"],
};

const sidebarItems: SidebarItem[] = [
  {
    title: "Overview",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Request",
    icon: Inbox,
    isActive: false,
    items: [
      {
        title: "Request Management",
        url: "vehicle-request.management",
      },
      // {
      //     title: "Request Approval",
      //     url: "vehicle-request.approve",
      // },
      {
        title: "Request Vehicle",
        url: "vehicle-request.create",
      }
    ],
  },
  {
    title: "Vehicle Management",
    url: "vehicle.index",
    icon: Inbox,
  },
  {
    title: "Profile",
    url: "profile.edit",
    icon: Calendar,
  },
];

export default function DashboardSidebar() {
  const user = usePage().props.auth.user

  const getSidebarItemsForRole = (role: UserRole) => {
    const allowedTitles = roleSidebarItems[role];
    return sidebarItems.filter((item) => {
      if (allowedTitles.includes(item.title)) {
        if (item.items) {
          item.items = item.items.filter((subItem) => allowedTitles.includes(subItem.title));
          return item.items.length > 0 ? item : null;
        }
        return item;
      }
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="ml-auto px-[3px] w-fit">
            <SidebarTrigger />
          </div>
          {getSidebarItemsForRole(user.role).map((item) => {
            return (
              <SidebarMenu>
                {
                  item.items && item.items.length > 0 ? (
                    <CollapsibleSidebarItem item={item} />
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href={route(item.url || "")}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

              </SidebarMenu>
            );
          })
          }
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href={route("logout")}
                method="post"
                as="button"
                className={cn(buttonVariants({ variant: "ghost" }), "text-red-500 hover:text-red-700")}
              >
                <LogOut />
                <span>Log Out</span>
              </Link>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar >
  )
}

const CollapsibleSidebarItem = ({
  item,
}: {
  item: SidebarItem
}) => {
  return (
    <Collapsible
      key={item.title}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <SidebarMenuSub>
            {
              item.items?.map((subItem) => (
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    <Link
                      href={subItem.url ? route(subItem.url) : ''}
                    >
                      {subItem.title}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))
            }
          </SidebarMenuSub>
        </CollapsibleContent>

      </SidebarMenuItem>
    </Collapsible>
  )
}
