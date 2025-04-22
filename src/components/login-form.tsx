import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "@/routes.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store.ts";
import {apiService, Credentials} from "@/config/apiServices.ts";
import {setUserLogged} from "@/app/features/user/userSlice.ts";
import {useState} from "react";
import {toast} from "sonner";
import User from "@/app/domain/User.ts";
import {HttpStatusCode} from "axios";



export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const dispatch = useDispatch();
  //const userLogged = useSelector((state: RootState) => state.users);
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState<string | null>(null); // Gestion des erreurs

  const validationSchema = Yup.object().shape({
    username: Yup.string()
        .email("Veuillez entrer une adresse email valide")
        .required("L'email est requis"),
    password: Yup.string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .required("Le mot de passe est requis"),
  });

  // Initialiser React Hook Form avec le résolveur Yup
  // @ts-ignore
  // @ts-ignore
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: yupResolver(validationSchema), // Connecte Yup à React Hook Form
  });

  // Gérer la soumission du formulaire
  const onSubmit = async (data: Credentials) => {

    setLoginError(null);


      const res = await apiService.login(data) as any 

      console.log("Données soumis :", res);
    try {
      if(res.success) {

        const token = res.data.token;
        const user = res.data.userDto as User;
        console.log(res)

        
        dispatch(setUserLogged({user: user, token: token})); // Dispatch action to set user in Redux store
        toast.success("Authentification réussie !")
        navigate(routes.dashboard);

      } else {

        setLoginError("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {

      if(res.data.status === HttpStatusCode.Unauthorized) {
        setLoginError("Nom d'utilisateur ou mot de passe incorrect");
      }else {
        setLoginError("Une erreur est survenue. Veuillez réessayer.");
      }
    }


  };



  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      {loginError && (
          <p className="text-red-500 text-center">{loginError}</p>
      )}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email/Username</Label>
          <Input id="email" type="email" placeholder="m@example.com" {...register("username")} required />
          {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
          )}

        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Mot de passe oublié?
            </a>
          </div>
          <Input id="password" type="password" required {...register("password")} />
          {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}

        </div>
        <Button type="submit" className="w-full bg-blue-600" >
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
          Se connecter avec google
        </Button>
      </div>
      <div className="text-center text-sm">
        Je ne suis pas organisateur ?{" "}
        <Link to={routes.register} className="underline underline-offset-4">
          S'enregistrer
        </Link>
      </div>
    </form>
  )
}
