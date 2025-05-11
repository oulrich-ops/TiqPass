/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tOnF6UPDszh
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import {Link} from "react-router-dom";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import {routes} from "@/config/routes";
import {GalleryVerticalEnd} from "lucide-react";

export default function Header() {
    return (
        <>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <MenuIcon className="h-6 w-6"/>
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link to="#">
                            <GalleryVerticalEnd className="h-6 w-6"/>
                            <span className="sr-only">ShadCN</span>
                        </Link>
                        <div className="grid gap-2 py-6">
                            <Link to="#" className="no-underline !text-inherit flex w-full items-center py-2 text-lg font-semibold">
                                Home
                            </Link>
                            <Link to="#" className="no-underline !text-inherit flex w-full items-center py-2 text-lg font-semibold">
                                About
                            </Link>

                            <Link to="#" className="no-underline !text-inherit flex w-full items-center py-2 text-lg font-semibold"
                                  >
                                Contact
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
                <Link to="#" className="mr-6 hidden lg:flex" >
                    <GalleryVerticalEnd className="h-6 w-6"/>
                    <span className="sr-only">ShadCN</span>
                </Link>
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        <NavigationMenuLink asChild>
                            <Link
                                to="#"
                                className=" no-underline !text-inherit  group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

                            >
                                Home
                            </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Link
                                to="#"
                                className="no-underline !text-inherit group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

                            >
                                About
                            </Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink asChild>
                            <Link
                                to="#"
                                className="!no-underline !text-inherit group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

                            >
                                Contact
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="ml-auto flex gap-2">

                    <Button variant="outline"><Link to={routes.login}>Connexion</Link></Button>
                    <Button ><Link to={routes.register} className={"no-underline !text-inherit"}>Devenir organisateur</Link></Button>
                </div>
            </header>

        </div>
    </>
    )
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}

