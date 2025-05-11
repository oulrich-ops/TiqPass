import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {routes} from "@/config/routes"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Gerer mes billetteries",
      url: "#",
      items: [
        {
          title: "Vue Globale",
          url: routes.dashboard,
        },
        {
          title: "Mes billetteries",
          url: routes.userEvents,
        },
        {
          title: "Créer une nouvelle billetterie",
          url: routes.eventCreation,
        },
      ],
    },
    /*{
      title: "Mes tickets",
      url: "#",
      items: [
        {
          title: "Mes tickets",
          url: routes.tickets,
        },
        {
          title: "Mes commandes",
          url: "#",
        },
        {
          title: "Mes événements",
          url: "#",
        },
      ],
    },*/
    {
      title: "Mon compte",
      url: "#",
      items: [
        {
          title: "Mon profil",
          url: routes.userSettings,
        },
        {
          title: "Mes paramètres",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="mb-4 mt-2">
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
          
        />
       
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
