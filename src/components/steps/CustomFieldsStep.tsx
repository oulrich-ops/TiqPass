import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomField, PriceCategory } from "@/types/EventTypes"
import { customFieldSchema } from "@/schemas/event.schema"
import { apiService } from "@/config/apiServices"
import { error } from "console"
import { toast } from "sonner"

const formSchema = z.object({
  fields: z.array(customFieldSchema)
})


const fieldTypes = [
  { value: "TEXT", label: "Texte" },
  { value: "NUMBER", label: "Nombre" },
  { value: "EMAIL", label: "Email" },
  { value: "DATE", label: "Date" },
  { value: "TEL", label: "Téléphone" },
];

interface Props {
  data: CustomField[]
  priceCategories: PriceCategory[]
  onUpdate: (data: CustomField[]) => void
  ticketting_id: number,
}

export function CustomFieldsStep({ data, priceCategories,ticketting_id, onUpdate }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //@ts-ignore
      fields: data.length > 0 ? data : []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields"
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    //@ts-ignore
    const champs: CustomField[] = values.fields.map((item)=>{
    return {
      name:item.name,
      priceCategoryIds: item.priceCategoryIds,
      required: item.required,
      type: item.type


    }
  })
  console.log(champs)

  apiService.addTickettingCustomFields(ticketting_id,champs).then(
    (res)=>{
      if(res.success){
        toast.success("Champs ajoutés avec succès")
        onUpdate(champs)
      }
    }
  ).catch((error)=> console.log(error))



  }

  const addField = () => {
    append({
      id: crypto.randomUUID(),
      name: "",
      type: "TEXT",
      required: false,
      priceCategoryIds: []
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Champs personnalisés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Champs par défaut</h3>
                    <p className="text-sm text-muted-foreground">
                      Ces champs seront toujours demandés lors de l'achat :
                    </p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Nom</li>
                      <li>Prénom</li>
                      <li>Email du payeur</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du champ</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Obligatoire</TableHead>
                    <TableHead>Catégories de prix</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`fields.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Nom du champ" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`fields.${index}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Type de champ" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {fieldTypes.map(type => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`fields.${index}.required`}
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Obligatoire
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`fields.${index}.priceCategoryIds`}
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex flex-col gap-2">
                                {priceCategories.map(category => (
                                  <div key={category.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      checked={field.value?.includes(category.id?.toString()??"")}
                                      onCheckedChange={(checked) => {
                                        const updatedIds = checked
                                          ? [...field.value, category.id]
                                          : field.value?.filter((id) => id !== category.id)
                                        field.onChange(updatedIds)
                                      }}
                                    />
                                    <FormLabel className="font-normal">
                                      {category.name}
                                    </FormLabel>
                                  </div>
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addField}
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un champ
              </Button>
            </div>
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