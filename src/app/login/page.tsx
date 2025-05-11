import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { motion } from "framer-motion";
import flat_ticket from "@/assets/images/flat_ticket.png"
import {Link} from "react-router-dom";
import {routes} from "@/config/routes";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to={routes.home} className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            TiqPass.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="lg:flex justify-center items-center h-screen relative hidden ">
        <motion.img
            src={flat_ticket}
            alt="Ticket Image"
            className="h-auto w-4/5  object-cover dark:brightness-[0.2] dark:grayscale"
            animate={{
              rotate: [-5, 5, -5], // Fait osciller entre -5° et +5°
            }}
            transition={{
              duration: 3, // Temps pour faire un cycle
              repeat: Infinity, // Répétition infinie
              ease: "easeInOut", // Effet fluide
            }}
        />
      </div>
    </div>
  )
}
