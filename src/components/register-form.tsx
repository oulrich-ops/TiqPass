
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { PhoneInput } from '@/components/ui/phone-input'
import {Link, useNavigate} from "react-router-dom";
import routes from '@/routes'
import {apiService} from "@/config/apiServices.ts";
import User from "@/app/domain/User.ts";
import {useDispatch, useSelector} from "react-redux";
import {setUserLogged} from "@/app/features/user/userSlice.ts";
import {RootState} from "@/app/store.ts";

// Define validation schema using Zod
const formSchema = z
    .object({
        nomprenom: z
            .string()
            .min(2, { message: 'Au moins 4 caractères '}),
        username: z.string().email({ message: 'Adresse email invalide' }),
        telephone: z.string(),//z.string().min(10, { message: 'Phone number must be valid' }),
        password: z
            .string()
            .min(6, { message: 'Le mot de passe doit être de 6 caractères au moins' })
            .regex(/[a-zA-Z0-9]/, { message: 'Mot de passe doit être alphanumérique' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Mot de passe non correspondente',
    })

export default function Register() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.users);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            nomprenom: '',
            telephone: '',
            password: '',
            confirmPassword: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Assuming an async registration function
            let userToSend:User={
                username: values.username,
                password: values.password,
                nomprenom: values.nomprenom,
                id:undefined,
                telephone: values.telephone,
                role:[],

            }
            console.log(user)

            await apiService.register(userToSend)

                .then(response => {
                    console.log(response)
                    toast.success(response.message)
                    if (response.success){
                        //dispatch(setUserLogged({ user: response.data.user }))
                        navigate(routes.login)
                    }


                })
            console.log(values)
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
            )
        } catch (error) {
            console.error('Form submission error', error)
            toast.error('Failed to submit the form. Please try again.')
        }
    }

    return (
        <div className="flex min-h-[60vh] h-full w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Inscription organisateur</CardTitle>
                    <CardDescription>
                        Creer un nouveau compte en remplissant le formulaire.
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-4">
                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="nomprenom"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="name" className={"flex justify-start"}>Nom complet*</FormLabel>
                                            <FormControl>
                                                <Input id="name"  {...field} />
                                            </FormControl>
                                            <FormMessage className={"flex justify-start"}/>
                                        </FormItem>
                                    )}
                                />

                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="email" className={"flex justify-start"}>Email*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    placeholder="xxxxx@mail.com"
                                                    type="email"
                                                    autoComplete="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className={"flex justify-start"}/>
                                        </FormItem>
                                    )}
                                />

                                {/* Phone Field */}
                                <FormField
                                    control={form.control}
                                    name="telephone"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="phone" className={"flex justify-start"}>Téléphone</FormLabel>
                                            <FormControl>
                                                <PhoneInput {...field} defaultCountry="BF" />
                                                {/* <Input
                          id="phone"
                          placeholder="555-123-4567"
                          type="tel"
                          autoComplete="tel"
                          {...field}
                        /> */}
                                            </FormControl>
                                            <FormMessage className={"flex justify-start"}/>
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="password" className={"flex justify-start"}>Mot de passe*</FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    id="password"
                                                    placeholder="******"
                                                    autoComplete="new-password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className={"flex justify-start"}/>
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password Field */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="confirmPassword" className={"flex justify-start"}>
                                                Confirmer le mot de passe*
                                            </FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    id="confirmPassword"
                                                    placeholder="******"
                                                    autoComplete="new-password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className={"flex justify-start"}/>
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full">
                                    S'enregistrer
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Avez vous déjà un compte?{' '}
                        <Link to={routes.login} className="underline">
                            Se connecter
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
