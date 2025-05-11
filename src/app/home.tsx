import { Link, useNavigate } from 'react-router-dom';
import { routes } from '@/config/routes';
import Header from "@/components/header.tsx";
import { useEffect, useState } from 'react';
import { Billeterie } from './features/UserBilletteries';
import { apiService } from '../config/apiServices';
import { Calendar, Clock, MapPin, Tag, Ticket, PlusCircle, X, ChevronRight } from 'lucide-react';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [publishedTicketting, setPublishedTickett] = useState<Billeterie[]>([]);
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const defaultbanner = import.meta.env.VITE_DEFAULT_BANNER

  const navigate = useNavigate();


  useEffect(() => {
    const fetchPublishedTicketting = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getPublishedEvents();
        if (!response.success) {
          throw new Error('Failed to fetch published ticketting');
        }
        const data = response.data as Billeterie[];
        setPublishedTickett(data);
      } catch (error) {
        console.error('Error fetching published ticketting:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublishedTicketting();
    
    // Afficher la popup après 10 secondes
    const timer = setTimeout(() => {
      setShowPromoPopup(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleView = (name: string, id: number) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const url = routes.ticketingPublicView(slug, id.toString());
    navigate(url);
  };

   const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <>
      <Header />
      
      {/* Hero Section avec recherche */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Trouvez vos billets pour des événements extraordinaires
            </h1>
            <p className="mt-6 text-xl text-blue-100">
              Concerts, spectacles, festivals, conférences et plus encore. Découvrez des événements qui vous passionnent.
            </p>
            
            <div className="mt-8">
              <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row">
                <div className="flex-grow mb-3 md:mb-0 md:mr-3">
                  <input 
                    type="text" 
                    placeholder="Rechercher un événement..." 
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition">
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Graphic element */}
        <div className="hidden lg:block absolute right-0 top-0 h-full w-1/3">
          <svg className="h-full w-full" viewBox="0 0 500 500" preserveAspectRatio="none">
            <path 
              d="M500,0 L500,500 L0,500 C150,400 300,300 500,0Z" 
              fill="rgba(255,255,255,0.1)"
            />
          </svg>
        </div>
      </div>
      
      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Billetteries disponibles</h2>
          <Link to={routes.events} className="text-blue-600 hover:text-blue-800 flex items-center">
            Voir tout <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : publishedTicketting.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedTicketting.map((event, index) => (
              <Link 
                to={`/event/${event.id}`} 
                key={index} 
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              > 
                <div className="relative h-48 overflow-hidden">
                  {event.bannerUrl ? (
                    <img 
                      src={`${API_BASE_URL}${event.bannerUrl}`} 
                      alt={event.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Ticket className="h-16 w-16 text-white/70" />
                    </div>
                  )}
                  {/*event.featured && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Populaire
                    </div>
                  )*/}
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2">{event.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{formatDate(event.startDate)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Tag className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">À partir de {event.minPrice}€</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      {/*event.available ? "Places disponibles" : "Complet"*/}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                     onClick={() => handleView(event.name, event.id)}>
                      Réserver →
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg py-10 px-6 text-center">
            <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune billetterie disponible</h3>
            <p className="text-gray-500 mb-4">Les événements à venir apparaîtront ici.</p>
          </div>
        )}
      </div>
      
      {/* Categories Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Explorez par catégorie
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Concerts", icon: "🎵", color: "bg-pink-100" },
              { name: "Festivals", icon: "🎪", color: "bg-purple-100" },
              { name: "Sports", icon: "⚽", color: "bg-green-100" },
              { name: "Théâtre", icon: "🎭", color: "bg-yellow-100" },
              { name: "Cinéma", icon: "🎬", color: "bg-red-100" },
              { name: "Conférences", icon: "🎤", color: "bg-blue-100" },
              { name: "Art & Culture", icon: "🎨", color: "bg-indigo-100" },
              { name: "Autres", icon: "✨", color: "bg-gray-100" }
            ].map((category, index) => (
              <Link
                to={`/category/${category.name.toLowerCase()}`}
                key={index}
                className={`${category.color} rounded-lg p-6 text-center hover:shadow-md transition group`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Become Organizer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Devenez organisateur</h2>
              <p className="text-blue-100 mb-6">
                Créez et gérez vos propres événements, vendez des billets en ligne et 
                profitez d'outils puissants pour le suivi et les statistiques.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Système de billetterie simplifiée",
                  "Contrôle d'accès en temps réel",
                  "Statistiques détaillées",
                  "Personnalisation complète"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={routes.register}
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Créer un compte organisateur
              </Link>
            </div>
            <div className="hidden md:block md:w-1/2 bg-blue-800 relative">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,0 L100,0 L100,100 L0,100 C20,70 40,40 0,0Z" fill="rgba(37, 99, 235, 0.5)" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/organizer-illustration.svg" alt="Organizer" className="max-w-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
            Pourquoi utiliser TiqPass ?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Une solution complète pour tous vos besoins en billetterie et en gestion d'événements
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Suivi en temps réel",
                description: "Maîtrisez vos effectifs de vente à tout moment grâce à notre tableau de bord intuitif",
                icon: (
                  <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Collaboration simplifiée",
                description: "Gérez votre équipe efficacement et assurez un meilleur suivi de vos événements",
                icon: (
                  <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Sécurité intégrée",
                description: "Bénéficiez d'un stockage sécurisé et d'une protection contre la fraude sur tous vos billets",
                icon: (
                  <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Restez informé des nouveaux événements
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour être le premier à connaître les nouveaux événements, 
            les ventes exclusives et les offres spéciales.
          </p>
          
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-lg font-bold text-gray-900 mb-4">TiqPass</h3>
              <p className="text-gray-600 max-w-xs">
                Un système de billetterie simple et efficace pour gérer vos événements et tickets en toute simplicité.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Billetterie</h3>
                <ul className="space-y-2">
                  {["Événements", "Catégories", "Comment ça marche", "Tarifs"].map((item, i) => (
                    <li key={i}>
                      <Link to="#" className="text-gray-600 hover:text-blue-600">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Compte</h3>
                <ul className="space-y-2">
                  {["Connexion", "Inscription", "Mot de passe oublié", "Devenir organisateur"].map((item, i) => (
                    <li key={i}>
                      <Link to="#" className="text-gray-600 hover:text-blue-600">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Support</h3>
                <ul className="space-y-2">
                  {["FAQ", "Contact", "Conditions d'utilisation", "Politique de confidentialité"].map((item, i) => (
                    <li key={i}>
                      <Link to="#" className="text-gray-600 hover:text-blue-600">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TiqPass. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["facebook", "twitter", "instagram", "linkedin"].map((social, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-blue-600">
                  <span className="sr-only">{social}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Popup */}
      {showPromoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden relative animate-fade-in-up">
            <button 
              onClick={() => setShowPromoPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <PlusCircle className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Devenez organisateur !</h3>
              <p className="text-blue-100">
                Vous avez un événement à promouvoir ? Créez votre propre billetterie en quelques minutes.
              </p>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Rejoignez les milliers d'organisateurs qui utilisent TiqPass pour gérer leurs événements et vendre des billets en ligne.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPromoPopup(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Plus tard
                </button>
                <Link
                  to={routes.register}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => setShowPromoPopup(false)}
                >
                  S'inscrire
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;



























{/*import { Link } from 'react-router-dom';
import {routes} from '@/routes';
import Header from "@/components/header.tsx";
import { useEffect, useState } from 'react';
import { Billeterie } from './app/features/UserBilletteries';
import { a } from 'node_modules/framer-motion/dist/types.d-6pKw1mTI';
import { apiService } from './config/apiServices';

function Home() {

  const [isLoading, setIsLoading] = useState(false);

  const [publishedTicketting, setPublishedTickett] = useState<Billeterie[]>([]);

  useEffect(() => {
    const fetchPublishedTicketting = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getUserTicketting();
        if (!response.success) {
          throw new Error('Failed to fetch published ticketting');
        }
        const data = response.data as Billeterie[];


        setPublishedTickett(data);
      } catch (error) {
        console.error('Error fetching published ticketting:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublishedTicketting();
  }, []);



  return (
      <>
        <Header/>
      <div className={"mt-10"}></div>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
       <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
          Bienvenue sur  <span className="text-blue-600">TiqPass 🎟️</span>
        </h1>
        <p className="mt-4 text-gray-600 sm:text-lg">
          Un système de billetterie simple et efficace pour gérer vos évènements, tickets en toute simplicité et clarté.</p>
        <div className="mt-6">
          <Link
            to={routes.dashboard}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Suivez voter billetterie</h2>
          <p className="mt-2 text-gray-600">
            Maitriser vos effectifs de vente à tout moment.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Collaborer facilement</h2>
          <p className="mt-2 text-gray-600">
            Gérer à plusieurs pour un meilleur suivi.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Mises à jour en temps réel</h2>
          <p className="mt-2 text-gray-600">
            Vos mises à jours sur vos billeterie sont appliquées instantanément
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Tableau de bord intuitif</h2>
          <p className="mt-2 text-gray-600">
            Accédez aux résumés et aux informations dans un tableau de bord bien organisé.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Vues personnalisables</h2>
          <p className="mt-2 text-gray-600">
            Vous décidez des champs et images disponibles sur vos billeterie
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Sûre et fiable</h2>
          <p className="mt-2 text-gray-600">
            Bénéficiez d'une solide intégrité des données grâce à un stockage sécurisé dans le cloud.
          </p>
        </div>
      </div>

       <footer className="mt-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TiqkisPass. All rights reserved.
      </footer>
    </div>
      </>
  );
}

export default Home;*/}