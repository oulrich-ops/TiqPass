import * as z from "zod"

export const generalInformationSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Le nom est requis"),
  type: z.string(),
  location: z.string().min(1, "Le lieu est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  durationType: z.enum(["no_duration", "duration", "multiple_days"]),
  startDate: z.union([z.string(), z.date()]),
  startTime: z.union([z.string(), z.date()]).optional(),
    endTime: z.union([z.string(), z.date()]).nullable().optional(),
  endDate: z.union([z.string(), z.date()]).nullable().optional(),
}).refine((data) => {
  if (data.durationType !== "no_duration") {
    return data.startDate !== undefined
  }
  return true
}, {
  message: "La date de début est requise",
  path: ["startDate"]
})

export const priceCategorySchema = z.object({
  id: z.union([z.string(),z.number()]).optional(),
  name: z.string().min(1, "Le nom est requis"),
  price: z.number().min(0, "Le prix doit être positif"),
  description: z.string(),
  totalLimit: z.number().min(0, "La limite doit être positive"),
  hasOrderLimit: z.boolean(),
  limitPerOrder: z.number().nullable().optional(),
  ticketting_id: z.number(),
})

export const customFieldSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom est requis"),
  type: z.enum(["TEXT", "NUMBER", "EMAIL", "DATE", "TEL"]),
  required: z.boolean(),
  priceCategoryIds: z.array(z.string())
})

export const customizationSchema = z.object({
  contactInfo: z.object({
    organizerName: z.string().min(1, "Le nom de l'organisateur est requis"),
    phone: z.string().min(1, "Le téléphone est requis"),
    email: z.string().email("Email invalide")
  }),
  description: z.object({
    short: z.string().max(200, "Maximum 200 caractères"),
    long: z.string()
  }),
  theme: z.object({
    primaryColor: z.string()
  }),
  images: z.object({
    banner: z.instanceof(File).optional(),
    thumbnail: z.instanceof(File).optional()
  }),
  registrationInfo: z.string()
}) 