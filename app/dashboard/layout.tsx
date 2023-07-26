import { notFound } from "next/navigation"

import { getCurrentUser } from "@/lib/session"


interface DashboardLayoutProps {
    children?: React.ReactNode
}

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    return (
        <div className="flex flex-col min-h-screen space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex items-center justify-between h-16 py-4">
                    <p>Header</p>
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <p>Dashboard Nav</p>
                </aside>
                <main className="flex flex-col flex-1 w-full overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}