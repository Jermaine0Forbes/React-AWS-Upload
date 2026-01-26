import type{  UserData, QuotaData } from "../interfaces";

export async function getUser(userId: number): Promise<UserData | Response> {
    const API_URL = import.meta.env.VITE_SYMFONY_URL+`/api/user/get/${userId}`;
    return await fetch(API_URL, {
        method: "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch((error) => {
        console.error("Error fetching user data:", error);
        throw error;
    });
}


export async function getQuota(userId: number): Promise<QuotaData | Response> {
    const API_URL = import.meta.env.VITE_SYMFONY_URL+`/api/user/${userId}/quota`;
    return await fetch(API_URL, {
        method: "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch((error) => {
        console.error("Error fetching user data:", error);
        throw error;
    });
}