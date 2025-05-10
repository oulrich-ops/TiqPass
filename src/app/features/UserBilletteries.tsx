import React, { use, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
//@ts-ignore
import fr from "date-fns/locale/fr"
import {undefined} from "zod";
import AppLayout from '@/app/dashboardLayout/page'
import { Skeleton } from "@/components/ui/skeleton"
import { FaEdit, FaTrash, FaGlobe,FaArchive, FaEye } from "react-icons/fa" 

import { apiService } from "@/config/apiServices";
import { API_BASE, toastWithDefaults } from "@/Constantes";
import { routes } from "@/routes";
import { useNavigate } from "react-router-dom";

export type Billeterie = {
    id: number;
  name: string;
  location: string;
  address: string;
  durationType: string;
  startDate: string; // ou Date
  endDate: string;   // ou Date
  bannerUrl: string;
  isPublished: boolean;
  minPrice: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const defaultbanner = import.meta.env.VITE_DEFAULT_BANNER
const UserBilletteries = () => {
  
  const navigate = useNavigate();
    const [data, setData] = useState<Billeterie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
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
        await apiService.updateIsPublished(id, true); // Appel API pour publier
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
      console.log(`Éditer billetterie avec ID : ${id}`);
      
      navigate(routes.eventEdit(id.toString()));
    };

    const handleDelete = (id: number) => {
      console.log(`Supprimer billetterie avec ID : ${id}`);
      // Ajoutez ici la logique pour supprimer
    };

    const handleView = (name: string, id: number) => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); 
  const url = routes.ticketingPublicView(slug, id.toString()); 
  console.log(`Visualiser billetterie avec URL : ${url}`);
  navigate(url); 
};    

  
    return (
      <AppLayout breadcrumb={[{ label: "Mes billetteries" }]}>
        {loading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(3)].map((_, i) => (
      <Card key={i} className="overflow-hidden shadow-md">
        <Skeleton className="w-full h-40" />
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    ))}
  </div>
) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <h2 className="text-lg font-semibold">Aucune billetterie trouvée</h2>
            <p className="text-sm text-muted-foreground">
              Vous n'avez pas encore créé de billetteries.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((b) => (
              <Card key={b.id} className="overflow-hidden shadow-md hover:shadow-lg transition">
                <img

                  src={b.bannerUrl ? `${API_BASE_URL}${b.bannerUrl}` : defaultbanner}
                  alt={`Bannière de ${b.name}`}
                  className="w-full h-40 object-cover"
                />
                
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{b.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(b.startDate), "EEEE d MMMM yyyy", { locale: fr })}
                  </p>
                  
                </CardContent>

                <div className="flex justify-end  gap-2 p-4">
                <button
    onClick={() => handleView(b.name, b.id)}
    className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
    title="Visualiser"
  >
    <FaEye />
  </button>
                <button
    onClick={() => handlePublish(b.id)}
    className={`p-2 rounded-full text-white ${
      b.isPublished
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600"
    }`}
    title="Publier"
    disabled={b.isPublished} // Désactive le bouton si isPublished est true
  >
    <FaGlobe />
  </button>
  <button
    onClick={() => handleArchive(b.id)}
    className={`p-2 rounded-full text-white ${
      !b.isPublished
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-yellow-500 hover:bg-yellow-600"
    }`}
    title="Archiver"
    disabled={!b.isPublished} // Désactive le bouton si isPublished est false
  >
    <FaArchive />
  </button>

                  <button
                    onClick={() => handleEdit(b.id)}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    title="Éditer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    title="Supprimer"
                  >
                    <FaTrash />
                  </button>
                </div>

                              </Card>
            ))}
          </div>
        )}
      </AppLayout>
    );
  };
  

export default UserBilletteries
