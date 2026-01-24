// import type { UploadData } from "../interfaces"; 

export async function postProfileUpload(data: FormData): Promise<Response> {
    const API_URL = import.meta.env.VITE_SYMFONY_URL+'/api/profile/upload';
    console.log(data)
    return await fetch(API_URL, {
        method: "POST",
        body: data,

    });
}