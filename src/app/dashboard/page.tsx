// src/app/layouts/AppLayout.tsx
import { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {useDispatch, useSelector} from "react-redux"
import { RootState } from "@/app/store"
import { FaCircleUser } from "react-icons/fa6"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {logout} from "@/app/features/user/userSlice.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {routes} from "@/routes.ts"

interface AppLayoutProps {
    children: ReactNode
    breadcrumb?: { label: string; href?: string }[]
}

export default function AppLayout({ children, breadcrumb = [] }: AppLayoutProps) {
    const user = useSelector((state: RootState) => state.user.user)
    const username = user?.username?.split("@")[0] || "Guest"
    const dispatch = useDispatch();
    const navigate = useNavigate()


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4 bg" />

                    {/* Breadcrumb dynamique */}
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>

                            </BreadcrumbItem>

                            {breadcrumb.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {item.href ? (
                                            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                        ) : (
                                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                        )}
                                    </BreadcrumbItem>
                                </div>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex flex-col items-center ml-auto cursor-pointer">
                                <FaCircleUser size={25} />
                                <span className="text-sm text-gray-500">{username}</span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profil</DropdownMenuItem>
                            <DropdownMenuItem>Facturation</DropdownMenuItem>
                            <DropdownMenuItem>Équipe</DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    alert("ici")
                                    dispatch(logout()); // Clear user and token from Redux and localStorage
                                    toast.success("Déconnexion réussie !");
                                    navigate(routes.login); // Redirect to the login page
                                }}
                            >
                                Se deconnecter
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                <main className="p-4">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}
