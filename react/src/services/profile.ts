import type { UploadData } from "../interfaces"; 

export async function postProfileUpload(data: Array<UploadData>) {
    const API_URL = import.meta.env.VITE_SYMFONY_URL+'/api/profile/upload';
    return await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
}