
import { apiRoutes } from "./apiRoutes";
import User from "@/app/domain/User.ts";
import { apiRequest } from "./apiServiceConfig";
import {EventGeneral} from "@/types/EventTypes.ts";




export interface AuthResponse {
    token: string;
    user: User;
}

export interface Event {
    id: string;
    title: string;
    date: string;
}

export interface EventType {
    id: number;
    name: string;
}

export interface Credentials {
username: string; password: string
}


export const apiService = {
    login: (credits: Credentials) =>
        apiRequest<AuthResponse>("POST", apiRoutes.auth.login, credits),

    register: (userData: User) =>
        apiRequest<AuthResponse>("POST", apiRoutes.auth.register, userData),

    createEvent: (eventData: EventGeneral) =>
        apiRequest<Event>("POST", apiRoutes.events.create, eventData),

    getProfile: () => apiRequest<User>("GET", apiRoutes.user.profile),

    updateProfile: (userData: { name?: string; email?: string }) =>
        apiRequest<User>("PUT", apiRoutes.user.updateProfile, userData),

    getEvents: () => apiRequest<Event[]>("GET", apiRoutes.events.list),

    getEventDetails: (eventId: string) =>
        apiRequest<Event>("GET", apiRoutes.events.details(eventId)),

    getTypeEvents: () => apiRequest<EventType>("GET", apiRoutes.events.eventType),
};
