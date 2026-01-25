import type { UploadDataProps } from "../interfaces"; 

export async function postProfileUpload({id, data}:UploadDataProps): Promise<Response> {
    const API_URL = import.meta.env.VITE_SYMFONY_URL+`/api/profile/${id}/upload`;
    console.log(data)
    return await fetch(API_URL, {
        method: "POST",
        body: data,

    });
}