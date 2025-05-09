import { SelectedTicket } from "@/app/features/billeteriepublique/TicketingPublicView";
import { z } from "zod";



export interface PurchaseInterface {
    eventId:number;
    tickets: SelectedTicket[];
    customer:CustomerInfo;
    taxe:number;

}

export const customerInfoSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
  });
  
export type CustomerInfo = z.infer<typeof customerInfoSchema>;
  

