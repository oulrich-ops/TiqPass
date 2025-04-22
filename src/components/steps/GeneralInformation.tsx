import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { generalInformationSchema } from "@/schemas/event.schema"
import {EventGeneral, EventType} from "@/types/EventTypes"
import {Button} from "@/components/ui/button.tsx";
import {apiService} from "@/config/apiServices.ts";
import {toast} from "sonner";
import {useEffect,useState} from "react";


interface Props {
  data: EventGeneral
  onUpdate: (data: EventGeneral) => void
}

export function GeneralInformation({ data, onUpdate }: Props) {
  const form = useForm<z.infer<typeof generalInformationSchema>>({
    resolver: zodResolver(generalInformationSchema),
    //@ts-ignore
    defaultValues: data
  })
const [typesEvent, setTypeEvent] = useState<EventType[]>([])

    const fetchTypesEvent = async () => {
        const response = await apiService.getTypeEvents();
        if (response.success) {
            
            setTypeEvent(response.data as EventType[]);
        } else {
            toast.error("Erreur, veuillez verifiez votre internet");
        }
    };
    useEffect(() => {
        fetchTypesEvent();
    },[])
     async function onSubmit(values: z.infer<typeof generalInformationSchema>) {
         const data_tosave : EventGeneral = {
            name: values.name,
            type: typesEvent.find(item => item.id.toString() == values.type),
            location: values.location,
            address: values.address,
            durationType: values.durationType,
            startDate: values.startDate,
            startTime: values.startTime,
            endDate: values.endDate,
            endTime: values.endTime
         }
         


         await apiService.createEvent(data).then(async (res) => {
          if(res.success) {
            let id_tck = res.data as number
              toast.success(`Succès, billeterie ${id_tck} crée`)
              form.setValue("id", id_tck)
              data_tosave.id = id_tck
          }
      })

    onUpdate(data_tosave)

  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">

          <FormField
  control={form.control}
  name="id"
  render={({ field }) => (
    <input type="hidden" {...field} />
  )}
/>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l'événement</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de l'événement" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Type d'événement</FormLabel>
                          <FormControl>
                              <select
                                  {...field}
                                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                  <option value="" disabled>
                                      Sélectionnez un type
                                  </option>
                                  {typesEvent.map((type) => (
                                      <option key={type.id} value={type.id}>
                                          {type.name}
                                      </option>
                                  ))}
                              </select>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lieu de l'événement</FormLabel>
                  <FormControl>
                    <Input placeholder="Lieu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Adresse complète"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
              <FormField
                  control={form.control}
                  name="durationType"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel className="mb-2">Durée de l'événement</FormLabel>
                          <FormControl>
                              <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col sm:flex-row gap-4"
                              >
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                      <RadioGroupItem value="no_duration" id="no_duration" />
                                      <span className="text-sm">Sans durée</span>
                                  </label>
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                      <RadioGroupItem value="duration" id="duration" />
                                      <span className="text-sm">Sur une durée</span>
                                  </label>
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                      <RadioGroupItem value="multiple_days" id="multiple_days" />
                                      <span className="text-sm">Sur plusieurs journées</span>
                                  </label>
                              </RadioGroup>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />


              {form.watch("durationType") === "no_duration" && (
                  <div className="space-y-4">
                      <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Date</FormLabel>
                                  <FormControl>
                                      <Input type="date" {...field} value={field.value ? field.value.toString() : undefined}/>
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                  </div>
              )}

              {form.watch("durationType") === "duration" && (
                  <div className="space-y-4">
                     <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Date</FormLabel>
                                  <FormControl>
                                      <Input type="date" {...field} value={field.value ? field.value.toString() : undefined}/>
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                       <div className="grid grid-cols-2 gap-4">
                      <FormField
                          control={form.control}
                          name="startTime"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Heure de début</FormLabel>
                                  <FormControl>
                                      <Input type="time" {...field} value={field.value ? field.value.toString() : undefined} />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="endTime"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Heure de fin</FormLabel>
                                  <FormControl>
                                      <Input type="time" {...field} {...field} value={field.value ? field.value.toString() : undefined} />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      /></div>
                  </div>
              )}

              {form.watch("durationType") === "multiple_days" && (
                  <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <FormField
                              control={form.control}
                              name="startDate"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Date de début</FormLabel>
                                      <FormControl>
                                          <Input type="date" {...field} value={field.value ? field.value.toString() : undefined}/>
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name="startTime"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Heure de début</FormLabel>
                                      <FormControl>
                                          <Input type="time" {...field} value={field.value ? field.value.toString() : undefined}/>
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <FormField
                              control={form.control}
                              name="endDate"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Date de fin</FormLabel>
                                      <FormControl>
                                          <Input type="date" {...field} value={field.value ? field.value.toString() : undefined}/>
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <FormField
                              control={form.control}
                              name="endTime"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Heure de fin</FormLabel>
                                      <FormControl>
                                          <Input type="time" {...field} value={field.value ? field.value.toString() : undefined}/>
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>
                  </div>
              )}
          </div>
        </div>

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