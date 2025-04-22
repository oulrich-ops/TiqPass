// src/config/apiServiceConfig.ts

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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


apiClient.interceptors.response.use(
    (response) => response, // Retourne la réponse si tout va bien
    (error) => {
        if (error.response?.status === 403) {
            localStorage.removeItem("token"); // Supprime le token
            window.location.href = "/login"; // Redirige vers la page de login
        }
        return Promise.reject(error); // Rejette l'erreur pour un traitement ultérieur
    }
);

// Définition d’une interface générique pour les réponses API
export interface ApiResponse<T> {
    success: boolean;
    data: T[] | T | T[][];
    message?: string;
}


export async function apiRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    data?: object,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await apiClient({
            method,
            url,
            data,
            ...config,
        });
        return { success: true, data: response.data.data };
    } catch (error: any) {
        return {
            success: false,
            data: error.response?.data || null,
            message: error.response?.data?.message || "Erreur inconnue",
        };
    }
}


export default apiClient;