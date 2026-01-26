
export interface PanelNewProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    userId: number;
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface UploadDataProps {
    id: number;
    data: FormData;
}

export interface MediaBlockProps {

    userId: number | undefined,
    mediaId: number,
    path: string,
    name: string,
    description: string,
    views: number
}

export interface MediaData {
    path: string,
    id: number,
    name: string,
    description: string,
    views: number,
    username: undefined | string,
    userId: undefined | string,
}

export interface UserData {
    id: number,
    username: string,
    email: string,
    tier: string,
    created_at: object,
    status: undefined
    
}

export interface UserDataContext {
    userData: object
} 

export interface UserContextProps {
    // userData: Response | UserDataContext | undefined;
    userData: Response | UserData | undefined;
}

export interface CreatedAtObj {
    date: string | undefined,
    timezone_type: number,
    timezone: string,
}

export interface ContentData {

    path: string,
    id: number,
    name: string,
    views: number,
    created_at: CreatedAtObj | string
}

export interface QuotaData {
    max: number,
    current: number,
    remainder: number,
}


