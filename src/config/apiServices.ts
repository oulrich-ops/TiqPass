
import { apiRoutes } from "./apiRoutes";
import User from "@/app/domain/User.ts";
import apiClient, { apiRequest, ApiResponse } from "./apiServiceConfig";
import {CustomField, Customization, EventGeneral, PriceCategory, WholeEventTicketting} from "@/types/EventTypes.ts";
import { Billeterie } from "@/app/features/UserBilletteries";




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
        apiRequest<number>("POST", apiRoutes.events.create, eventData),

    getProfile: () => apiRequest<User>("GET", apiRoutes.user.profile),

    updateProfile: (userData: { name?: string; email?: string }) =>
        apiRequest<User>("PUT", apiRoutes.user.updateProfile, userData),

    getEvents: () => apiRequest<Event[]>("GET", apiRoutes.events.list),

    getEventDetails: (eventId: string) =>
        apiRequest<Event>("GET", apiRoutes.events.details(eventId)),

    getTypeEvents: () => apiRequest<EventType>("GET", apiRoutes.events.eventType),

    getUserTicketting: ()=> apiRequest<Billeterie[]>("GET", apiRoutes.events.list),

    addTickettingPriceCategories: (ticketting_id:number,categories:PriceCategory[]) =>
        apiRequest<void>("POST", apiRoutes.events.addPricing(ticketting_id.toString()), categories),

    addTickettingCustomFields: (ticketting_id:number, champs:CustomField[]) =>
        apiRequest<void>("POST",apiRoutes.events.addCustomFields(ticketting_id.toString()),champs),

    addTickettingCustomization: (ticketting_id:number, customization:Customization) =>
        apiRequest<void>("POST",apiRoutes.events.addCustomization(ticketting_id),customization),

    getTicketingById: (ticketting_id:number) =>
        apiRequest<WholeEventTicketting>("GET", apiRoutes.events.getTicketingById(ticketting_id)),

    updateIsPublished: (eventId: number, isPublished: boolean) =>
        apiRequest<void>("PUT", apiRoutes.events.updateIsPublished(eventId, isPublished)),
    
          };


export const apiFileService = {

    uploadFile: async (fichier: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", fichier);
    
        const res = await apiClient.post<ApiResponse<string>>("/files/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    
        return res.data.data as string 
    }
    
    }
