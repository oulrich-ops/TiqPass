import { Check, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Routes, useNavigate } from "react-router-dom";
import { routes } from "@/config/routes";

export default function PaymentSuccess() {
  const [_, setLocation] = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Paiement Réussi !</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Votre commande a été confirmée et est en cours de traitement.
          </p>
        </div>

        <div className="rounded-md bg-green-50 p-4 border border-green-100 mt-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Confirmation de commande</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Un email de confirmation a été envoyé à votre adresse email avec tous les détails de votre commande.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => navigate(routes.home)}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Retour à la boutique
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-800">Détails de la commande</h3>
            <div className="mt-3 text-sm text-gray-600">
              <div className="grid grid-cols-2 gap-1">
                <span className="font-medium">Numéro de commande:</span>
                <span>ORD-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                <span className="font-medium">Date:</span>
                <span>{new Date().toLocaleDateString('fr-FR')}</span>
                <span className="font-medium">Méthode de paiement:</span>
                <span>Carte bancaire</span>
              </div>
            </div>
          </div>

          <p className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
            Besoin d'aide ? <a href="#" className="text-primary hover:text-primary/80 font-medium">Contactez notre service client</a> ou appelez le <span className="font-medium">01 23 45 67 89</span>
          </p>
        </div>
      </div>
    </div>
  );
}