import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PriceCategory } from "@/types/EventTypes"
import { priceCategorySchema } from "@/schemas/event.schema"

const formSchema = z.object({
  categories: z.array(priceCategorySchema)
})

interface Props {
  data: PriceCategory[]
  onUpdate: (data: PriceCategory[]) => void
}

export function PricingStep({ data, onUpdate }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: data.length > 0 ? data : []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categories"
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values.categories)
  }

  const addCategory = () => {
    append({
      id: crypto.randomUUID(),
      name: "",
      price: 0,
      description: "",
      totalLimit: 0,
      hasOrderLimit: false,
      limitPerOrder: undefined
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Catégories de prix</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Limite totale</TableHead>
                  <TableHead>Limite par commande</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`categories.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} placeholder="Ex: Standard" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`categories.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={e => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`categories.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} placeholder="Description" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`categories.${index}.totalLimit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={e => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name={`categories.${index}.hasOrderLimit`}
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormDescription>Activer la limite</FormDescription>
                            </FormItem>
                          )}
                        />
                        {form.watch(`categories.${index}.hasOrderLimit`) && (
                          <FormField
                            control={form.control}
                            name={`categories.${index}.limitPerOrder`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={e => field.onChange(Number(e.target.value))}
                                    placeholder="Limite par commande"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
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
              className="mt-4"
              onClick={addCategory}
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une catégorie
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
} 