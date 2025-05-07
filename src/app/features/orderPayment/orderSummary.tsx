import { ArrowRight, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SelectedTicket } from "../billeteriepublique/TicketingPublicView";

interface OrderSummaryProps {
  tickets: SelectedTicket[];
  total: number;
  onPayment: () => void;
  isFormValid: boolean;
}

export default function OrderSummary({ tickets, total, onPayment, isFormValid }: OrderSummaryProps) {
  const vatRate = 0.2;
  const vatAmount = total * vatRate / (1 + vatRate);
  
  const handlePayClick = () => {
    if (isFormValid) {
      onPayment();
    } else {
      // Add shake animation to the button when form is invalid
      const button = document.getElementById('pay-button');
      if (button) {
        button.classList.add('shake');
        setTimeout(() => {
          button.classList.remove('shake');
        }, 820);
      }
    }
  };
  
  return (
    <div className="bg-gray-50 p-6 md:w-2/5 border-l border-gray-200">
      <h2 className="text-xl font-semibold mb-5 flex items-center">
        <span>Résumé de la commande</span>
        <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">Sécurisé</Badge>
      </h2>
      
      <div className="space-y-4 mb-5 bg-white p-4 rounded-md shadow-sm">
        {tickets.map((ticket) => (
          <div key={ticket.categoryId} className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-0 last:pb-0">
            <div>
              <span className="font-medium">{ticket.categoryName}</span>
              <div className="text-sm text-gray-500">
                <span>x {ticket.quantity}</span>
              </div>
            </div>
            <span className="font-medium text-gray-900">{(ticket.price * ticket.quantity).toFixed(2)} €</span>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-4 rounded-md shadow-sm mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Sous-total</span>
          <span className="font-medium">{total.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span>TVA (incluse)</span>
          <span>{vatAmount.toFixed(2)} €</span>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold">Total</span>
            <span className="font-bold text-primary">{total.toFixed(2)} €</span>
          </div>
        </div>
      </div>
      
      <Button
        id="pay-button"
        onClick={handlePayClick}
        className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-md font-medium transition-all"
        disabled={!isFormValid}
      >
        <span className="flex items-center justify-center">
          <CreditCard className="mr-2 h-5 w-5" />
          <span>Procéder au paiement</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </span>
      </Button>
      
      <div className="mt-5">
        <div className="flex items-center justify-center text-sm text-gray-600 mb-3">
          <Lock className="mr-1.5 h-4 w-4 text-primary" />
          <span>Paiement sécurisé par Stripe</span>
        </div>
        
        <div className="flex items-center justify-center mb-3 bg-white p-3 rounded-md shadow-sm">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-gray-600">
              <CreditCard className="h-6 w-6 mb-1" />
              <span className="text-xs">Carte</span>
            </div>
            <div className="flex flex-col items-center text-gray-600">
              <svg className="h-6 w-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M3 10H20.5" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="text-xs">Visa/MC</span>
            </div>
            <div className="flex flex-col items-center text-gray-600">
              <ShieldCheck className="h-6 w-6 mb-1" />
              <span className="text-xs">3D Secure</span>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          En validant votre commande, vous acceptez les conditions générales de vente
        </p>
      </div>
    </div>
  );
}