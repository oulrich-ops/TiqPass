import { CreditCard, Loader2 } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center max-w-md mx-4">
        <div className="relative mb-5">
          <Loader2 className="animate-spin h-12 w-12 text-primary" />
          <CreditCard className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Traitement en cours</h3>
        <p className="text-gray-600 text-center mb-1">Veuillez patienter pendant que nous traitons votre paiement</p>
        <p className="text-sm text-gray-500 text-center">Ne fermez pas cette fenêtre</p>
        
        <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}