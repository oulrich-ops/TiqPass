import React from 'react';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';

 const NotFound: React.FC = () => {
  const path = window.location.pathname;
  
  const goHome = () => {
    window.location.href = '/';
  };
  
  const goBack = () => {
    window.history.back();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-100">
            <AlertTriangle className="h-12 w-12 text-blue-600" />
          </div>
          
          <h1 className="mt-5 text-3xl font-bold text-blue-900">Page non trouvée</h1>
          
          <div className="mt-4 px-4 py-3 bg-blue-50 rounded-md">
            <p className="text-blue-700 font-mono text-sm truncate">
              {path}
            </p>
          </div>
          
          <p className="mt-4 text-gray-600">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center gap-4">
            <button 
              onClick={goHome}
              className="flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Accueil
            </button>
            
            <button 
              onClick={goBack}
              className="flex items-center justify-center px-5 py-3 border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </button>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-blue-100">
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div 
                key={dot}
                className="w-2 h-2 rounded-full bg-blue-300"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;