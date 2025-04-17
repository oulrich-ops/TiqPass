import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiRoutes } from "./apiRoutes";
import User from "@/app/domain/User.ts";

// Configuration d'Axios
const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/tiqpass/v1", // Remplace par ton API_BASE_URL
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Intercepteur pour ajouter un token d'authentification
apiClient.interceptors.request.use((config  ) => {
    const token = localStorage.getItem("token"); // Récupération du token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Définition d’une interface générique pour les réponses API
export interface ApiResponse<T> {
    success: boolean;
    data: T[] | T | T[][];
    message?: string;
}


async function apiRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    data?: object,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse<T> = await apiClient({
            method,
            url,
            data,
            ...config,
        });
        return { success: true, data: response.data };
    } catch (error: any) {
        return {
            success: false,
            data: error.response?.data || null,
            message: error.response?.data?.message || "Erreur inconnue",
        };
    }
}



export interface AuthResponse {
    token: string;
    user: User;
}

export interface Event {
    id: string;
    title: string;
    date: string;
}

export interface Credentials {
username: string; password: string
}


export const apiService = {
    login: (credits: Credentials) =>
        apiRequest<AuthResponse>("POST", apiRoutes.auth.login, credits),

    register: (userData: User) =>
        apiRequest<AuthResponse>("POST", apiRoutes.auth.register, userData),

    getProfile: () => apiRequest<User>("GET", apiRoutes.user.profile),

    updateProfile: (userData: { name?: string; email?: string }) =>
        apiRequest<User>("PUT", apiRoutes.user.updateProfile, userData),

    getEvents: () => apiRequest<Event[]>("GET", apiRoutes.events.list),

    getEventDetails: (eventId: string) =>
        apiRequest<Event>("GET", apiRoutes.events.details(eventId)),
};
