import { toast } from "sonner";

export const API_BASE = "http://localhost:8080";

export const toastWithDefaults = {
    success: (message: string) => toast.success(message, {
      position: 'top-right',
      duration: 5000,
     /* style: {
        background: 'green',
        color: 'white',
      },*/
      icon: '✅',
    }),
    
    error: (message: string) => toast.error(message, {
      position: 'top-right',
      duration: 5000,
      icon: '❌',
      
    }),
  
    info: (message: string) => toast.info(message, {
      position: 'top-right',
      duration: 5000,
      icon: 'ℹ️',
      
    }),
    warning: (message: string) => toast.warning(message, {
        position: 'top-right',
        duration: 5000,
        icon: '⚠️',
        
      })
  };
  
  
