import HeroBanner from './HeroBanner';
import EventInfos from './EventInfos';
import Tabs from './TicketsTab';
import TicketSelector from './TicketSelector';
import CheckoutSummary from './CheckoutSummary';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { WholeEventTicketting } from '@/types/EventTypes';
import { apiService } from '@/config/apiServices';
import { Skeleton } from '@/components/ui/skeleton';
import CartSummary from './CartSummary';
import OrderSummary from '../orderPayment/orderSummary';
import Checkout from '../orderPayment/checkout';


export type SelectedTicket = {
  categoryId: number;
  categoryName: string;
  quantity: number;
  price: number;
};

const TicketingPublicView = () => {

  const { id, slug } = useParams<{ id: string; slug: string }>();
  

  const [data, setData] = useState<WholeEventTicketting | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const primaryColor = data?.customization?.theme.primaryColor || "#3B82F6";
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  const [showCartSummary, setShowCartSummary] = useState<boolean>(false);
  const total = selectedTickets.reduce(
    (sum, ticket) => sum + ticket.quantity * ticket.price,
    0
  );

  

  useEffect(() => {
    const updatedTickets: SelectedTicket[] = [];
  
    data?.priceCategory.forEach((cat) => {
      const quantity = quantities[cat.id!.toString()] || 0;
      if (quantity > 0) {
        updatedTickets.push({
          categoryId: Number(cat.id!),
          categoryName: cat.name,
          quantity,
          price: cat.price,
        });
      }
    });
  
    setSelectedTickets(updatedTickets);
  }, [quantities, data?.priceCategory]);

  useEffect(() => {
    const fetchEventData = async () => {
      if (id) {
        try {
           await apiService.getTicketingById(Number(id)).then(
            (response)=>{
              const res= response.data as WholeEventTicketting
              setData(res); 
            }
           )
           
        } catch (error) {
          console.error("Erreur lors du chargement des données :", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEventData();
  }, [id]);

 

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 p-4">
        <Skeleton className="h-96 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!data || data.priceCategory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 space-y-6 max-w-md mx-auto text-center">
        <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Billetterie en préparation
        </h2>
        <p className="text-gray-600">
          Cette billetterie est actuellement en cours de préparation. Revenez bientôt pour découvrir les détails et réserver vos billets.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div  className="font-sans"
    style={{ ['--primary-color' as any]: data?.customization?.theme?.primaryColor }}
  >
      <HeroBanner event={data?.eventGeneral} customization={data?.customization} 
      primaryColor={primaryColor}/>

<div className="max-w-6xl mx-auto w-full px-4 py-8 flex-grow">
      <EventInfos event={data?.eventGeneral} primaryColor={primaryColor}/>

     {/*<Tabs
        
        registrationInfo={data?.customization.registrationInfo || ""}
        priceCategories={}
        customFields={}
      /> */}
{showCartSummary ? (
  <Checkout tickets={selectedTickets} total={total} 
  onback={()=> setShowCartSummary(false)}/>
) : (
      <>
      <div id="tickets" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center" /*style={{ color: primaryColor }}*/>
            Sélectionnez vos billets
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <TicketSelector 
                priceCategories={data.priceCategory} 
                customFields={data.customField}
                quantities={quantities}
                setQuantities={setQuantities}

              />
            </div>
          </div>
        </div>


<div className="mb-12 mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center" >
            À propos de l'évènement
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <p className="text-xl font-medium mb-4">{data.customization?.description?.shortDescription || ""}</p>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data.customization?.description?.longDescription || "" }}
              />
            </div>
          </div>
        </div>



<div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center" >
            Informations pratiques
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data.customization?.registrationInfo || "" }}
              />
            </div>
          </div>
        </div>

{/* Checkout Summary - Desktop: Side panel */}
<div className="hidden lg:block absolute bottom-0 right-0 w-72 transform -translate-y-1/2 pt-6">
  <div className="bg-white rounded-xl shadow-lg p-4">
    <h3 className="font-bold text-lg mb-12" >
      Récapitulatif
    </h3>
    <CheckoutSummary 
    primaryColor={primaryColor}
    selectedTickets={selectedTickets} 
    onProceed={() => setShowCartSummary(true)}
    />
  </div>
</div>

        <div className="lg:hidden fixed bottom-6 right-6 z-10">
          <button 
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white"
            style={{ backgroundColor: primaryColor }}
            onClick={() => setShowSummary(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>

        {/*<CheckoutSummary primaryColor={data?.customization.theme.primaryColor || ""} />*/}
        {showSummary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-end lg:hidden">
            <div className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-auto animate-slide-up">
              <div className="p-4 border-b sticky top-0 bg-white flex justify-between items-center">
                <h3 className="font-bold text-lg" style={{ color: primaryColor }}>
                  Votre panier
                </h3>
                <button 
                  onClick={() => setShowSummary(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <CheckoutSummary 
                primaryColor={primaryColor}
                selectedTickets={selectedTickets} 
                onProceed={() => setShowCartSummary(true)}/>
                
              </div>
            </div>
          </div>
        )}
  <button  style={{
    backgroundColor: total < 1 ? '#cccccc' : primaryColor,
    opacity: total < 1 ? 0.6 : 1
  }} className="text-white py-2 px-4 rounded align-center w-full "
                onClick={() => setShowCartSummary(true)} 
                disabled={total < 1}>
          Finaliser 
        </button>
        </>
      )}
        </div>


    <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">
                {data.eventGeneral.name}
              </h3>
              <p className="text-gray-300 text-sm">
                © {new Date().getFullYear()} - Tous droits réservés
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Confidentialité
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TicketingPublicView;