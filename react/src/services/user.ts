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

export async function registerUser(data: FormData): Promise< any | Response> {
    const API_URL = import.meta.env.VITE_SYMFONY_URL+`/api/user/register`;
    return await fetch(API_URL, {
        method: "POST",
        body: data,
    })
    .then((response) => {
        // if (!response.ok) {
        //     const err = response.json();
        //     throw new Error(response);
        //     // throw new Error(`HTTP error! status: ${response.statusText}`);
        // }
        return response.json();
    })
    .then(response =>  {
        if(!response?.ok) {
            throw new Error(response?.message)
        }

        return response;
    })
    .catch((error) => {
        console.error("Error fetching user data:", error);
        throw error;
    });
}


export async function loginUser(data: FormData): Promise< any | Response> {
    const API_URL = import.meta.env.VITE_SYMFONY_URL+`/api/user/login`;
    return await fetch(API_URL, {
        method: "POST",
        body: data,
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