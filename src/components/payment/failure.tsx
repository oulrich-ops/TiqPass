import { AlertTriangle, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function PaymentFailure() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Paiement échoué</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Nous n'avons pas pu traiter votre paiement. Veuillez réessayer.
          </p>
        </div>

        <div className="rounded-md bg-red-50 p-4 border border-red-100 mt-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Raisons possibles</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Solde insuffisant sur votre carte</li>
                  <li>Informations de carte incorrectes</li>
                  <li>Transaction refusée par votre banque</li>
                  <li>Problème temporaire avec notre service de paiement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => setLocation("/checkout")}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au paiement
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Besoin d'aide ? <a href="#" className="text-primary hover:text-primary/80 font-medium">Contactez notre service client</a> ou appelez le <span className="font-medium">01 23 45 67 89</span>
          </p>
          <div className="flex justify-center mt-3 space-x-4">
            <div className="flex flex-col items-center">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
              <span className="text-xs text-gray-500 mt-1">100% Sécurisé</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-gray-500 mt-1">support@example.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}