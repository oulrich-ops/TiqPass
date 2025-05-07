import { useState } from "react";
import { CheckCheck, Loader2, ShoppingBag } from "lucide-react";

import { toastWithDefaults } from "@/Constantes";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { SelectedTicket } from "../billeteriepublique/TicketingPublicView";
import { CustomerInfo, PurchaseInterface } from "@/types/PaymentType";
import CustomerForm from "./customerForm";
import OrderSummary from "./orderSummary";
import LoadingOverlay from "./LoadingOverlay";
import apiClient from "@/config/apiServiceConfig";
import { apiPaymentService } from "@/config/apiServices";


type props = {
  tickets:SelectedTicket[];
  total:number;
  onback: () => void;
}

 const Checkout = ({ tickets, total,onback }:props) =>{

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const pkg = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  const stripePromise = loadStripe(pkg!);
  

  const handleCustomerInfoChange = (info: CustomerInfo) => {
    setCustomerInfo(info);
  };

  const handlePayment = async () => { 


    try {
      setIsLoading(true);
      const purchase: PurchaseInterface = {
        eventId:0,
        customer:customerInfo,
        tickets:tickets
      }
      const res = await apiPaymentService.createCheckoutSession(purchase)
      const data = res.data as { sessionId: string };

      const  sessionId  = data.sessionId;
      const stripe = await stripePromise;
      if(sessionId)
      await stripe?.redirectToCheckout({ sessionId });
    
    else
    toastWithDefaults.error("Une erreur s'est produite, reessayez")
    } catch (error) {
      console.error("Payment error:", error);
      toastWithDefaults
      toastWithDefaults.error("Une erreur est survenue lors du traitement du paiement.")
     
    } finally {
      setIsLoading(false);
    }
}

  {/*
  if (isLoadingTickets) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-gray-600 font-medium">Chargement des informations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-500 text-xl">!</span>
          </div>
          <h2 className="text-xl font-semibold text-destructive mb-2">Erreur</h2>
          <p className="text-gray-600 mb-4">Impossible de charger les informations de commande.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }
*/}
  return (
    <>
    <button  
    className="text-white py-2 px-4 rounded bg-red-500 mb-5" 
    onClick={onback}>
              Retour 
            </button>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
     
      <div className="max-w-4xl mx-auto">
        {/* Header with steps */}
        <div className="bg-white shadow-md rounded-t-lg p-5 mb-1">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Finaliser votre commande</h1>
            <div className="hidden md:block">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-1">1</span>
              <span className="font-medium text-primary">Informations</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs mr-1">2</span>
              <span>Paiement</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs mr-1">3</span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="bg-white shadow-md rounded-b-lg overflow-hidden">
          <div className="md:flex">
            <CustomerForm 
              customerInfo={customerInfo} 
              onInfoChange={handleCustomerInfoChange} 
            />
            
            <OrderSummary 
              tickets={tickets || []} 
              total={total} 
              onPayment={handlePayment} 
              isFormValid={!!(customerInfo.firstName && customerInfo.lastName && customerInfo.email)}
            />
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <CheckCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Paiement sécurisé</h3>
              <p className="text-sm text-gray-500">Vos données sont cryptées</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Confirmation rapide</h3>
              <p className="text-sm text-gray-500">Email instantané</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Support client</h3>
              <p className="text-sm text-gray-500">Assistance 7j/7</p>
            </div>
          </div>
        </div>
      </div>
      
      {isLoading && <LoadingOverlay />}
    </div>
    </>
  );
}

export default Checkout;