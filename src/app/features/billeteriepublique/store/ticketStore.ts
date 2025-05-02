import { create } from 'zustand';

export type Ticket = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  categoryId: number;
  description?: string;
  maxPerOrder?: number;
  available?: number;
};

type CustomField = {
  id: number;
  name: string;
  value: string;
  ticketId: number;
};

interface TicketState {
  selectedTickets: Ticket[];
  customFields: CustomField[];
  totalAmount: number;
  processingFee: number;
  isCheckoutEnabled: boolean;
  
  // Actions
  addTicket: (ticket: Ticket) => void;
  removeTicket: (ticketId: number) => void;
  updateTicketQuantity: (ticketId: number, quantity: number) => void;
  addCustomField: (field: CustomField) => void;
  updateCustomField: (field: CustomField) => void;
  calculateTotal: () => void;
  clearStore: () => void;
}

export const useTicketStore = create<TicketState>((set, get) => ({
  selectedTickets: [],
  customFields: [],
  totalAmount: 0,
  processingFee: 0,
  isCheckoutEnabled: false,
  
  addTicket: (ticket) => {
    set((state) => {
      // Check if ticket already exists
      const existingTicketIndex = state.selectedTickets.findIndex(t => t.id === ticket.id);
      
      if (existingTicketIndex !== -1) {
        // Update existing ticket
        const updatedTickets = [...state.selectedTickets];
        const currentQuantity = updatedTickets[existingTicketIndex].quantity;
        
        // Apply max per order limit if available
        const maxPerOrder = ticket.maxPerOrder || Infinity;
        const newQuantity = Math.min(currentQuantity + 1, maxPerOrder);
        
        updatedTickets[existingTicketIndex] = {
          ...updatedTickets[existingTicketIndex],
          quantity: newQuantity
        };
        
        return { selectedTickets: updatedTickets };
      } else {
        // Add new ticket with quantity 1
        return { 
          selectedTickets: [...state.selectedTickets, { ...ticket, quantity: 1 }]
        };
      }
    });
    
    // Calculate new total after adding ticket
    get().calculateTotal();
  },
  
  removeTicket: (ticketId) => {
    set((state) => ({
      selectedTickets: state.selectedTickets.filter(ticket => ticket.id !== ticketId),
      customFields: state.customFields.filter(field => field.ticketId !== ticketId)
    }));
    
    // Calculate new total after removing ticket
    get().calculateTotal();
  },
  
  updateTicketQuantity: (ticketId, quantity) => {
    set((state) => {
      // If quantity is 0, remove the ticket
      if (quantity <= 0) {
        return {
          selectedTickets: state.selectedTickets.filter(ticket => ticket.id !== ticketId),
          customFields: state.customFields.filter(field => field.ticketId !== ticketId)
        };
      }
      
      // Otherwise update the quantity
      const updatedTickets = state.selectedTickets.map(ticket => {
        if (ticket.id === ticketId) {
          // Apply max per order limit if available
          const maxPerOrder = ticket.maxPerOrder || Infinity;
          const newQuantity = Math.min(quantity, maxPerOrder);
          
          return { ...ticket, quantity: newQuantity };
        }
        return ticket;
      });
      
      return { selectedTickets: updatedTickets };
    });
    
    // Calculate new total after updating quantity
    get().calculateTotal();
  },
  
  addCustomField: (field) => {
    set((state) => ({
      customFields: [...state.customFields, field]
    }));
  },
  
  updateCustomField: (field) => {
    set((state) => {
      const existingFieldIndex = state.customFields.findIndex(
        f => f.id === field.id && f.ticketId === field.ticketId
      );
      
      const updatedFields = [...state.customFields];
      
      if (existingFieldIndex !== -1) {
        // Update existing field
        updatedFields[existingFieldIndex] = field;
      } else {
        // Add new field
        updatedFields.push(field);
      }
      
      return { customFields: updatedFields };
    });
  },
  
  calculateTotal: () => {
    set((state) => {
      // Calculate subtotal from tickets
      const subtotal = state.selectedTickets.reduce(
        (sum, ticket) => sum + (ticket.price * ticket.quantity), 
        0
      );
      
      // Calculate processing fee (example: 2% of subtotal with minimum 0.50€)
      const fee = subtotal > 0 ? Math.max(subtotal * 0.02, 0.5) : 0;
      
      // Calculate total
      const total = subtotal + fee;
      
      // Determine if checkout is enabled (at least one ticket selected)
      const checkoutEnabled = state.selectedTickets.length > 0;
      
      return {
        totalAmount: total,
        processingFee: fee,
        isCheckoutEnabled: checkoutEnabled
      };
    });
  },
  
  clearStore: () => {
    set({
      selectedTickets: [],
      customFields: [],
      totalAmount: 0,
      processingFee: 0,
      isCheckoutEnabled: false
    });
  }
}));