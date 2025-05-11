import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { JSX } from "react";


export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  tickets: '/tickets',
  ticketDetails: (ticketId: string) => `/tickets/${ticketId}`, // Example for dynamic routes
  userSettings: '/user-settings',
  not_found: '/404',
  eventCreation: '/event-creation',
  eventEdit: (id: string) => `/event-edit/${id}`,
  userEvents:  `/events`,
  userEventDetails: (userId: string, eventId: string) => `/users/${userId}/events/${eventId}`,
  ticketingPublicPath: '/ticketting/:slug/:id/p',
  ticketingPublicView: (slug: string, id: string) => `/ticketting/${slug}/${id}/p`,
  paymentfail: '/payment/failure',
  paymentSuccess: '/payment/success',
  events: '/events',

  customerOrder: (orderId: string) => `/order/${orderId}`,
};



export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.user.token);
  const navigate = useNavigate();


  if (!token) {
    navigate(routes.login);
  }

  return children;
};

export const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.user.token);
  const navigate = useNavigate();

  if (token) {
    navigate(routes.dashboard)
  }

  return children;
};

