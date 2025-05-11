// src/app/pages/OrderDetails.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiPaymentService, apiService } from "@/config/apiServices";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Ticket, Calendar, MapPin, Clock, Download, Printer, Mail, User, CreditCard, Share2 } from "lucide-react";
import { OrderDetails as OrderDto } from "@/types/OrderTypes";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export default function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        const response = await apiPaymentService.getOrderDetails(orderId as string);
        if (!response.success) {
          throw new Error('Failed to fetch order details');
        }
        setOrder(response.data as OrderDto);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Impossible de récupérer les détails de votre commande. Veuillez réessayer plus tard ou contacter notre support.');
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    } else {
      setError('Numéro de commande manquant');
      setIsLoading(false);
    }
  }, [orderId]);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Chargement des détails de votre commande...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Une erreur est survenue</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Retour à l'accueil
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Order confirmation header */}
        <div className="mb-8 text-center">
          <Badge variant={
            order.status === 'PAID' ? 'default' :
            order.status === 'refunded' ? 'destructive' : 'secondary'
          } className="mb-4">
            {order.status === 'PAID' ? 'Confirmée' :
             order.status === 'refunded' ? 'Remboursée' : 'Annulée'}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Détails de votre commande</h1>
          <p className="mt-2 text-gray-600">
            Commande #{order.orderNumber} • <span className="font-medium">{formatDate(order.date)}</span>
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          {/* Event information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Informations sur l'événement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 h-36 bg-gray-100 rounded-md flex items-center justify-center">
                  {order.eventImage ? (
                    <img 
                      src={`${API_BASE_URL}${order.eventImage}`} 
                      alt={order.eventName} 
                      className="w-full h-full object-cover rounded-md" 
                    />
                  ) : (
                    <Calendar className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{order.eventName}</h3>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start">
                      <Calendar className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-gray-700">{formatDate(order.eventDate)}</p>
                        <p className="text-sm text-gray-500">{order.eventTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                      <p className="text-gray-700">{order.eventLocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tickets */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Billets</CardTitle>
              <CardDescription>
                Vos billets ont été envoyés à {order.customerEmail}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.tickets.map((ticket, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                    <div className="flex items-start">
                      <Ticket className="mr-3 h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">{ticket.category}</p>
                        <p className="text-sm text-gray-500">{ticket.quantity} x {ticket.unitPrice.toFixed(2)} €</p>
                      </div>
                    </div>
                    <p className="font-medium">{(ticket.quantity *ticket.unitPrice).toFixed(2)} €</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{order.totalAmount.toFixed(2)} €</span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <CreditCard className="mr-1 h-4 w-4" />
                  <span>Payé par {order.paymentMethod}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" /> Télécharger les billets
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Printer className="mr-2 h-4 w-4" /> Imprimer
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" /> Renvoyer par email
              </Button>
            </CardFooter>
          </Card>

          {/* Customer information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Vos informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Client</h4>
                  <div className="flex items-start">
                    <User className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-gray-600">{order.customerEmail}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Paiement</h4>
                  <div className="flex items-start">
                    <CreditCard className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{order.paymentMethod}</p>
                      <p className="text-gray-600">{formatDate(order.date)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help and actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <Button variant="link" className="text-gray-600" onClick={() => window.location.href = '/'}>
              Retour à l'accueil
            </Button>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" /> Partager
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                Besoin d'aide ?
              </Button>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="text-center text-sm text-gray-500 mt-12">
            <p>Cette page contient tous les détails de votre commande.</p>
            <p>Si vous avez des questions ou besoin d'assistance, contactez notre équipe support à support@tiqpass.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}