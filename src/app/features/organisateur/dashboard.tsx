// src/app/pages/Dashboard.tsx
import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { apiService } from "@/config/apiServices";
import { Billeterie, BilleterieStats } from '@/app/features/UserBilletteries';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Calendar, 
  Clock, 
  TicketIcon, 
  Users, 
  TrendingUp, 
  CreditCard, 
  Plus, 
  ChevronRight,
  CalendarDays,
  BarChart2
} from "lucide-react";
import AppLayout from "@/app/dashboardLayout/page";
import { routes } from "@/config/routes";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [userEvents, setUserEvents] = useState<BilleterieStats[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalTickets: 0,
    soldTickets: 0,
    revenue: 0,
    visitors: 0
  });
  
  const today = new Date();
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Simulated recent activity data
  const recentActivity = [
    { id: 1, type: 'ticket_sold', event: 'Festival de Musique', date: today, amount: 45 },
    { id: 2, type: 'new_registration', event: 'Conférence Tech', date: new Date(today.getTime() - 86400000), amount: null },
    { id: 3, type: 'ticket_sold', event: 'Exposition d\'Art', date: new Date(today.getTime() - 172800000), amount: 25 },
  ];

  // Simulated sales data for chart
  const salesData = [
    { name: 'Lun', ventes: 12 },
    { name: 'Mar', ventes: 19 },
    { name: 'Mer', ventes: 15 },
    { name: 'Jeu', ventes: 22 },
    { name: 'Ven', ventes: 30 },
    { name: 'Sam', ventes: 40 },
    { name: 'Dim', ventes: 25 },
  ];

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserEvents = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getUserSatsTicketting();
        console.log("Données des événements :", response);
        if (!response.success) {
          throw new Error('Failed to fetch user events');
        }
        const data = response.data as BilleterieStats[];
        setUserEvents(data);
        
        // Calculate stats from fetched data
        setStats({
          totalEvents: data.length,
          activeEvents: data.filter(event => new Date(event.startDate) >= today).length,
          totalTickets: data.reduce((acc, event) => acc + (event.totalTickets || 0), 0),
          soldTickets: data.reduce((acc, event) => acc + (event.soldTickets || 0), 0),
          revenue: data.reduce((acc, event) => acc + (event.revenue || 0), 0),
          visitors: data.reduce((acc, event) => acc + (0), 0)
        });
      } catch (error) {
        console.error('Error fetching user events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserEvents();
  }, []);

  return (
    <AppLayout breadcrumb={[{ label: "Vue globale" }]}>
      <div className="space-y-6">
        {/* Welcome header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bienvenue, {user?.username?.split("@")[0] || "Utilisateur"}</h1>
            <p className="text-muted-foreground">Voici un résumé de vos activités et événements</p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={() => navigate(routes.eventCreation)}>
            
            <Plus className="mr-2 h-4 w-4" /> Billeterie
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Événements</CardTitle>
              <TicketIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stats.activeEvents}</span> événements actifs
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Billets Vendus</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.soldTickets} / {stats.totalTickets}</div>
              <Progress className="mt-2" value={(stats.soldTickets / Math.max(stats.totalTickets, 1)) * 100} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.revenue.toFixed(2)} €</div>
              <p className="text-xs text-muted-foreground">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visiteurs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                Sur tous vos événements
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="events">Mes événements</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Sales Chart */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Ventes de billets</CardTitle>
                  <CardDescription>Ventes sur les 7 derniers jours</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="ventes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>Dernières transactions et activités</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className={`p-2 rounded-full mr-3 ${
                          activity.type === 'ticket_sold' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {activity.type === 'ticket_sold' ? <TicketIcon className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium text-sm">
                              {activity.type === 'ticket_sold' ? 'Billet vendu' : 'Nouvelle inscription'}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(activity.date)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.event}</p>
                          {activity.amount && (
                            <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 hover:bg-green-50">
                              +{activity.amount} €
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" size="sm">
                    Voir toutes les activités <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
                <CardDescription>Vos prochains événements</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : userEvents.length > 0 ? (
                  <div className="space-y-4">
                    {userEvents
                      .filter(event => new Date(event.startDate) >= today)
                      .slice(0, 3)
                      .map((event, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                          <div className="w-full md:w-32 h-24 bg-gray-100 rounded-md flex items-center justify-center">
                            {event.bannerUrl ? (
                              <img 
                                src={event.bannerUrl} 
                                alt={event.name} 
                                className="w-full h-full object-cover rounded-md" 
                              />
                            ) : (
                              <Calendar className="h-10 w-10 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{event.name}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <CalendarDays className="mr-1 h-4 w-4" />
                                  {formatDate(new Date(event.startDate))}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Clock className="mr-1 h-4 w-4" />
                                  {event.startDate || '19:00'}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center text-sm">
                                  <TicketIcon className="mr-1 h-4 w-4" />
                                  <span className="font-medium">{event.soldTickets || 0}</span>
                                  <span className="text-muted-foreground">/{event.totalTickets || 0}</span>
                                </div>
                                <div className="mt-1">
                                  <Badge variant={event.isPublished === true ? 'default' : 'secondary'}>
                                    {event.isPublished === true ? 'Publiée' : 'Brouillon'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-between items-center">
                              <Progress value={(event.soldTickets / Math.max(event.totalTickets!, 1)) * 100} className="w-32" />
                              <Button variant="outline" size="sm">
                                Gérer
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Aucun événement à venir</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Vous n'avez pas encore créé d'événements ou ils sont tous passés.
                    </p>
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Créer un événement
                    </Button>
                  </div>
                )}
              </CardContent>
              {userEvents.length > 3 && (
                <CardFooter>
                  <Button variant="ghost" className="w-full" size="sm">
                    Voir tous les événements <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tous mes événements</CardTitle>
                <CardDescription>Gérez tous vos événements</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : userEvents.length > 0 ? (
                  <div className="space-y-4">
                    {userEvents.map((event, index) => (
                      <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                        <div className="w-full md:w-32 h-24 bg-gray-100 rounded-md flex items-center justify-center">
                          {event.bannerUrl ? (
                            <img 
                              src={event.bannerUrl} 
                              alt={event.name} 
                              className="w-full h-full object-cover rounded-md" 
                            />
                          ) : (
                            <Calendar className="h-10 w-10 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{event.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <CalendarDays className="mr-1 h-4 w-4" />
                                {formatDate(new Date(event.startDate))}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <BarChart2 className="mr-1 h-4 w-4" />
                                Revenus: {(event.revenue || 0).toFixed(2)} €
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-sm">
                                <TicketIcon className="mr-1 h-4 w-4" />
                                <span className="font-medium">{event.soldTickets || 0}</span>
                                <span className="text-muted-foreground">/{event.totalTickets || 0}</span>
                              </div>
                              <div className="mt-1">
                                <Badge variant={
                                  new Date(event.startDate) < today 
                                    ? 'outline' 
                                    : event.isPublished === true ? 'default' : 'secondary'
                                }>
                                  {new Date(event.startDate) < today 
                                    ? 'Terminé' 
                                    : event.isPublished === true ? 'Actif' : 'Brouillon'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <Progress value={(event.soldTickets / Math.max(event.totalTickets!, 1)) * 100} className="w-32" />
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">
                                Statistiques
                              </Button>
                              <Button variant="default" size="sm">
                                Gérer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Aucun événement</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Vous n'avez pas encore créé d'événements.
                    </p>
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Créer un événement
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyses et statistiques</CardTitle>
                <CardDescription>Performance globale de vos événements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Analytics en cours de développement</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cette fonctionnalité sera bientôt disponible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}