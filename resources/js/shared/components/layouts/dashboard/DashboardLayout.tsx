import { DashboardSidebar } from "@/shared/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { PropsWithChildren, ReactNode } from "react";

export default function DashboardLayout({ children, header, desc }: PropsWithChildren<{ header?: string, desc?: string }>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full bg-white dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800">
          <div className="flex items-center gap-4 px-4 py-6 sm:px-6 lg:px-8">
            <SidebarTrigger className="md:hidden" />

            <div className="max-w-7xl">
              <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                {header}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {desc}
              </p>
            </div>
          </div>
        </header>
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

