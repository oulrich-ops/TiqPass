import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
//@ts-ignore
import fr from "date-fns/locale/fr"
import {undefined} from "zod";
import AppLayout from '@/app/dashboard/page.tsx'
import { Skeleton } from "@/components/ui/skeleton"

import { apiService } from "@/config/apiServices";

export type Billeterie = {
    id: number;
  name: string;
  location: string;
  address: string;
  durationType: string;
  startDate: string; // ou Date
  endDate: string;   // ou Date
  bannerUrl: string;
}


const UserBilletteries = () => {
    const [data, setData] = useState<Billeterie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    const fetchBilleteries = async () => {
      try {
        setLoading(true);
        const res = await apiService.getUserTicketting();
  
        if (res.success && res.data) {
          setData(res.data as Billeterie[]);
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
                  src={b.bannerUrl}
                  alt={`Bannière de ${b.name}`}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{b.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(b.startDate), "EEEE d MMMM yyyy", { locale: fr })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </AppLayout>
    );
  };
  

export default UserBilletteries
