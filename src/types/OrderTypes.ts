export interface OrderTicket {
  id: string;
  category: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderDetails {
  id: string;
  orderNumber: string;
  date: string;
  status: "PAID" | "canceled" | "refunded";
  customerName: string;
  customerEmail: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventImage?: string;
  tickets: OrderTicket[];
  totalAmount: number;
  paymentMethod: string;
}