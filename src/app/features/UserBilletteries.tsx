import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
//@ts-ignore
import fr from "date-fns/locale/fr";
import AppLayout from '@/app/dashboardLayout/page';
import { routes } from "@/config/routes";
import { apiService } from "@/config/apiServices";
import { toastWithDefaults } from "@/utils/Constantes";
// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons
import { 
  CalendarIcon, 
  MapPinIcon, 
  EyeIcon, 
  GlobeIcon, 
  ArchiveIcon, 
  PencilIcon, 
  TrashIcon, 
  MoreHorizontalIcon,
  TagIcon,
  UsersIcon,
  PlusIcon
} from "lucide-react";

export type Billeterie = {
  id: number;
  name: string;
  location: string;
  address: string;
  durationType: string;
  startDate: string;
  endDate: string;
  bannerUrl: string;
  isPublished: boolean;
  minPrice: number;
  totalTickets?: number;
}

export interface BilleterieStats extends Billeterie {
  soldTickets: number;
  revenue: number;
  availableTickets: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const defaultbanner = import.meta.env.VITE_DEFAULT_BANNER;

const UserBilletteries = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Billeterie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const fetchBilleteries = async () => {
    try {
      setLoading(true);
      const res = await apiService.getUserTicketting();

      if (res.success && res.data) {
        const data = res.data as Billeterie[];
        console.log("Données des billetteries :", data);
        setData(data);
      } else {
        console.warn("Pas de données retournées");
      }
    } catch (err) {
      console.error("Erreur API :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBilleteries();
  }, []);

  const handlePublish = async (id: number) => {
    try {
      await apiService.updateIsPublished(id, true);
      toastWithDefaults.success("Billetterie publiée avec succès !");
      setData((prevData) =>
        prevData.map((b) =>
          b.id === id ? { ...b, isPublished: true } : b
        )
      );
    } catch (error) {
      console.error("Erreur lors de la publication :", error);
      toastWithDefaults.error("Une erreur est survenue lors de la publication.");
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await apiService.updateIsPublished(id, false);
      toastWithDefaults.success("Billetterie archivée avec succès !");
      setData((prevData) =>
        prevData.map((b) =>
          b.id === id ? { ...b, isPublished: false } : b
        )
      );
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
      toastWithDefaults.error("Une erreur est survenue lors de l'archivage.");
    }
  };

  const handleEdit = (id: number) => {
    navigate(routes.eventEdit(id.toString()));
  };

  const handleDelete = (id: number) => {
    console.log(`Supprimer billetterie avec ID : ${id}`);
    // Ajouter logique de confirmation et suppression
  };

  const handleView = (name: string, id: number) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const url = routes.ticketingPublicView(slug, id.toString());
    navigate(url);
  };

  const getFormattedDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "EEEE d MMMM yyyy", { locale: fr });
    } catch (e) {
      console.error("Erreur de formatage de date:", e);
      return dateString;
    }
  };

  const filteredData = data.filter((billeterie) => {
    if (activeTab === "published") return billeterie.isPublished;
    if (activeTab === "draft") return !billeterie.isPublished;
    return true; // "all" tab
  });

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-blue-50 p-3 mb-4">
        <CalendarIcon className="h-6 w-6 text-blue-500" />
      </div>
      <h3 className="text-lg font-medium mb-2">Aucune billetterie trouvée</h3>
      <p className="text-sm text-gray-500 text-center max-w-md mb-6">
        {activeTab === "published"
          ? "Vous n'avez pas encore de billetteries publiées. Publiez vos billetteries pour les rendre visibles au public."
          : activeTab === "draft"
          ? "Vous n'avez pas de billetteries en brouillon. Les billetteries non publiées apparaîtront ici."
          : "Vous n'avez pas encore créé de billetteries. Commencez par créer votre première billetterie."}
      </p>
      <Button onClick={() => navigate(routes.eventCreation)}>
        <PlusIcon className="h-4 w-4 mr-2" />
        Créer une billetterie
      </Button>
    </div>
  );

  return (
    <AppLayout breadcrumb={[{ label: "Mes billetteries" }]}>
      <div className="space-y-6">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mes billetteries</h1>
            <p className="text-gray-500">Gérez vos billetteries et suivez leurs performances</p>
          </div>
          <Button onClick={() => navigate(routes.eventCreation)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Nouvelle billetterie
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">
              Toutes
              <Badge variant="outline" className="ml-2">{data.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="published">
              Publiées
              <Badge variant="outline" className="ml-2">{data.filter(b => b.isPublished).length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="draft">
              Brouillons
              <Badge variant="outline" className="ml-2">{data.filter(b => !b.isPublished).length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {renderBilleterieGrid()}
          </TabsContent>
          <TabsContent value="published" className="mt-0">
            {renderBilleterieGrid()}
          </TabsContent>
          <TabsContent value="draft" className="mt-0">
            {renderBilleterieGrid()}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );

  function renderBilleterieGrid() {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="w-full h-48" />
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      );
    }

    if (filteredData.length === 0) {
      return renderEmptyState();
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((billeterie) => (
          <Card key={billeterie.id} className="overflow-hidden h-full flex flex-col">
            <div className="relative">
              <img
                src={billeterie.bannerUrl ? `${API_BASE_URL}${billeterie.bannerUrl}` : defaultbanner}
                alt={`Bannière de ${billeterie.name}`}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = defaultbanner;
                }}
              />
              <div className="absolute top-4 right-4">
                <Badge variant={billeterie.isPublished ? "default" : "secondary"}>
                  {billeterie.isPublished ? "Publié" : "Brouillon"}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6 flex-grow">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{billeterie.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{getFormattedDate(billeterie.startDate)}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="line-clamp-1">{billeterie.location}</span>
                </div>
                
                {billeterie.minPrice !== undefined && (
                  <div className="flex items-center">
                    <TagIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>À partir de {billeterie.minPrice}€</span>
                  </div>
                )}
                
                {billeterie.totalTickets !== undefined && (
                  <div className="flex items-center">
                    <UsersIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{billeterie.totalTickets ==0? "Non défini":billeterie.totalTickets+" places"} </span>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => handleView(billeterie.name, billeterie.id)}
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                Prévisualiser
              </Button>
              
              <TooltipProvider>
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Actions</TooltipContent>
                  </Tooltip>
                  
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(billeterie.id)}>
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    
                    {!billeterie.isPublished ? (
                      <DropdownMenuItem 
                        onClick={() => handlePublish(billeterie.id)}
                        disabled={billeterie.isPublished}
                      >
                        <GlobeIcon className="h-4 w-4 mr-2" />
                        Publier
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem 
                        onClick={() => handleArchive(billeterie.id)}
                        disabled={!billeterie.isPublished}
                      >
                        <ArchiveIcon className="h-4 w-4 mr-2" />
                        Archiver
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem 
                      onClick={() => handleDelete(billeterie.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
};

export default UserBilletteries;