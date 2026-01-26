import { type MediaData, type ContentData } from "../interfaces";

export async function getUserContent(userId: number): Promise<MediaData[]> {
    const API_URL = import.meta.env.VITE_SYMFONY_URL+`/api/user/${userId}/content`;
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


export async function getUserMedia(mediaId: number): Promise<MediaData>
{
    const API_URL = import.meta.env.VITE_SYMFONY_URL+`/api/media/${mediaId}`;
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


export async function getContent(): Promise<ContentData[]>
{
    const API_URL = import.meta.env.VITE_SYMFONY_URL+`/api/content`;
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