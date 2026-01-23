import type { UploadData } from "../interfaces"; 

export async function postProfileUpload(data: Array<UploadData>) {
    return await fetch('/api/profile/upload', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
}