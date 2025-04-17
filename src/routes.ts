const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  tickets: '/tickets',
  ticketDetails: (ticketId: string) => `/tickets/${ticketId}`, // Example for dynamic routes
  userSettings: '/user-settings',
  not_found: '/404',
  eventCreation: '/event-creation',
  userEvents:  `/events`,
  userEventDetails: (userId: string, eventId: string) => `/users/${userId}/events/${eventId}`,
};

export default routes;