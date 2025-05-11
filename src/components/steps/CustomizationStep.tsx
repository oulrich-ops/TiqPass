import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { customizationSchema } from "@/schemas/event.schema"
import { Customization } from "@/types/EventTypes"
import { Button } from "../ui/button"
import { apiFileService, apiService } from "@/config/apiServices"
import { toast } from "sonner"

interface Props {
  data: Customization,
  ticketting_id: number,
  onUpdate: (data: Customization) => void
}

export function CustomizationStep({ data,ticketting_id, onUpdate }: Props) {
  const form = useForm<z.infer<typeof customizationSchema>>({
    resolver: zodResolver(customizationSchema),
    //@ts-ignore
    defaultValues: data
  })

  async function onSubmit(values: z.infer<typeof customizationSchema>) {
    try {
      
  
     
      const images: { banner?: string; thumbnail?: string } = {};
  
      if (values.images.banner instanceof File) {
        const fileUrl = await apiFileService.uploadFile(values.images.banner);
         images.banner = fileUrl ; 
      }
      
      if (values.images.thumbnail instanceof File) {
        const fileUrl = await apiFileService.uploadFile(values.images.thumbnail);
        images.thumbnail = fileUrl; 
 
      }
  
      
      const customization: Customization = {
        contactInfo: values.contactInfo,
        description: {
          longDescription: values.description.long,
          shortDescription: values.description.short,
        },
        images,
        registrationInfo: values.registrationInfo,
        theme: values.theme
      };
  
      
      const res = await apiService.addTickettingCustomization(ticketting_id, customization);
  
      if (res.success) {
        toast.success("Enregistrement avec succès");
        onUpdate(customization); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la soumission");
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations de contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="contactInfo.organizerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l'organisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de l'organisateur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactInfo.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Numéro de téléphone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactInfo.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Adresse email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description de l'événement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="description.short"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description courte</FormLabel>
                  <FormControl>
                    <Input placeholder="Résumé de l'événement" {...field} />
                  </FormControl>
                  <FormDescription>
                    Maximum 200 caractères
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description.long"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description détaillée</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description complète de l'événement"
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personnalisation visuelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="theme.primaryColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Couleur principale</FormLabel>
                  <FormControl>
                    <Input
                      type="color"
                      className="h-10 w-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
            <FormField
  control={form.control}
  name="images.banner"
  render={({ field: { value, onChange, ...field } }) => (
    <FormItem>
      <FormLabel>Bannière (920x250)</FormLabel>
      <FormControl>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChange(file);
            }}
            {...field}
          />
          {value && !(value instanceof File) && (
            <img
              src={value}
              alt="Bannière"
              className="h-20 w-auto object-cover"
            />
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="images.thumbnail"
  render={({ field: { value, onChange, ...field } }) => (
    <FormItem>
      <FormLabel>Vignette</FormLabel>
      <FormControl>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChange(file);
            }}
            {...field}
          />
          {value && !(value instanceof File) && (
            <img
              src={value}
              alt="Vignette"
              className="h-20 w-20 object-cover"
            />
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations d'inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="registrationInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions pour les participants</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informations importantes pour les participants"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
         <div className="flex justify-end mt-6">
                      <Button
                          variant="outline"
                          type={"submit"}
                          className={"bg-green-600 text-white hover:bg-green-700 hover:text-white"}
                      >
                          Enregistrer
                      </Button>
        
                  </div>
      </form>
    </Form>
  )
} 