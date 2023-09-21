import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Playground",
            href: "/docs",
        },
        {
            title: "blog",
            href: "/support",
            disabled: true,
        },
    ],
    sidebarNav: [
        {
            title: "Posts",
            href: "/dashboard",
            icon: "post",
        },
        {
            title: "Tables",
            href: "/dashboard/billing",
            icon: "billing",
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: "settings",
        },
    ],
}