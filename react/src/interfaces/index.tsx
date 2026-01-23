export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface UploadData {
    file: File;
    filename: FormDataEntryValue | null;
    description: FormDataEntryValue | null;
}