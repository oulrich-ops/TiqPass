
export const apiRoutes = {
    auth: {
        login: `/auth/login`,
        register: `/auth/signup`,
    },
    user: {
        profile: `/user/profile`,
        updateProfile: `/user/update`,
    },
    events: {
        create: `/ticketing/create-event`,
        addPricing: (eventId: string) => `/ticketing/${eventId}/add-price-categories`,
        addCustomFields: (eventId: string) => `/ticketing/${eventId}/customize-fields`,
        addCustomization: (eventId: number) => `/ticketing/${eventId}/customize`,
        list: `/ticketing/my-ticketing-events`,
        details: (eventId: string) => `/events/${eventId}`,
        eventType: `/ticketing/event-types`,
        getTicketingById: (ticketting_id: number) => `/ticketing/${ticketting_id}`,
        
    },
    userEvents: {
        list: (userId: string) => `/users/${userId}/events`,
        details: (userId: string, eventId: string) => `/users/${userId}/events/${eventId}`,
    },
    fileManagement:{
        upload: `/files/upload` 
    }
};