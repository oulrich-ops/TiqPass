
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
        addCustomFields: (eventId: string) => `/ticketing/${eventId}/customize`,
        list: `/events`,
        details: (eventId: string) => `/events/${eventId}`,
        eventType: `/ticketing/event-types`,
    },
    userEvents: {
        list: (userId: string) => `/users/${userId}/events`,
        details: (userId: string, eventId: string) => `/users/${userId}/events/${eventId}`,
    }
};