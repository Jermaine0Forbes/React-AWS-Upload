
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

    userId: number,
    mediaId: number,
    path: string,
    name: string,
    description: string,
    views: number
}

