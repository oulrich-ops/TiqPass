
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
        list: `/events`,
        details: (eventId: string) => `/events/${eventId}`,
    },
    userEvents: {
        list: (userId: string) => `/users/${userId}/events`,
        details: (userId: string, eventId: string) => `/users/${userId}/events/${eventId}`,
    }
};