import React, { useRef, useState } from 'react';
// import { useForm, SubmitHandler, FormProvider} from "react-hook-form"
import Typography from "@mui/material/Typography";
import { TabPanel } from "../../components/TabPanel";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type {PanelNewProps } from "../../interfaces";
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { Button, FormGroup, TextField, Card, CardContent, Stack, FormControl } from '@mui/material';
// import { Form } from 'react-router';
import { useMutation } from "@tanstack/react-query";
import { postProfileUpload } from '../../services/profile';
import  CircularProgress  from "@mui/material/CircularProgress";
import {Snackbar} from '@mui/material';

export default function PanelNew({ value, index, userId }: PanelNewProps) {
    const [fileInputStatus, setFileInputStatus] = useState<number>(1);
    const [fileArr, setFileArr] = useState<Array<File>>([]);
    const [notifyMsg, setNotifyMsg] = useState<string>("");
    const [notifyOpen, setNotifyOpen] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const uploadInputRef = useRef<HTMLFormElement | null>(null);
    const handleClick = (): void => {
        fileInputRef.current?.click();
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (files) {
            const arr = Array.from(files);
            setFileArr(arr);
            setFileInputStatus(2);
        }
    }

    const handleCancel = (): void => {
        setFileArr([]);
        setFileInputStatus(1);
    }

    const uploadMutation = useMutation({
        mutationFn: postProfileUpload,
        onSuccess: async (data) => { 
            console.log(await data.json());
            setFileInputStatus(1);
            setNotifyMsg('Media uploaded successfully!');
            setNotifyOpen(true);
        }
    });
    const handleSubmit = (): void => {
        const uploadForm = uploadInputRef.current;
        if (!uploadForm) return;
        setFileInputStatus(3);
        const contentData = new FormData(uploadForm);
        const fileData = new FormData();
        let metadata: Record<string, FormDataEntryValue | null> = {};
        for (let i = 0; i < fileArr.length; i++) {
            metadata = {
                
                filename: contentData.get("filename-" + i),
                description: contentData.get("description-" + i)
            };
            console.log(metadata);
            fileData.append("file-"+i, fileArr[i]);
            fileData.append("metadata-"+i, JSON.stringify(metadata));

        }
        uploadMutation.mutate({id: userId, data:fileData});
    }

    return (
        <TabPanel value={value} index={index}>
            new content
            <form
                // onSubmit={handleSubmit(onSubmit)}
                id="select-form"
                onClick={handleClick}
                className={fileInputStatus == 1 ? "file-input" : "file-input-toggle hidden"}
            >
                <input type="file" name="files" multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                // {...register("file")} 
                />
                <Typography
                    variant="h5"
                    className="title"
                >
                    Drag and drop files here or click to select files to upload
                </Typography>
                <UploadFileIcon
                    className="upload-icon"
                />
                <button type="submit">Upload</button>
            </form>

            <div
                id="upload-list"
                className={fileInputStatus == 2 ? "file-upload" : "file-upload hidden"}
            >
                <form
                    id="upload-form"
                    ref={uploadInputRef}
                >
                    {fileArr.length > 0 && fileArr.map((file, index) => (
                        <Card key={index} className="upload-card">
                            <Stack
                                direction="row">
                                <FilePresentIcon />
                                <CardContent className="card-content">
                                    <FormGroup>
                                        <FormControl>
                                            <TextField
                                                variant='standard'
                                                id="filename"
                                                // name={"filename[]"}
                                                name={"filename-" + index}
                                                defaultValue={file.name}
                                            >
                                            </TextField>
                                        </FormControl>

                                        <FormControl>
                                            <TextField
                                                variant='standard'
                                                id="description"
                                                name={"description-" + index}
                                                placeholder="enter file description"
                                            />
                                        </FormControl>

                                    </FormGroup>


                                </CardContent>

                            </Stack>
                        </Card>
                    ))}
                </form>
                <Button onClick={handleCancel}>cancel</Button>
                <Button onClick={handleSubmit}>upload</Button>
            </div>
            <div
                className={fileInputStatus == 3 ? "file-upload" : "file-upload hidden"}
            >
                    <CircularProgress/>
            </div>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal:"center"}}
                open={notifyOpen}
                onClose={() => setNotifyOpen(false)}
                message={notifyMsg}
                autoHideDuration={3000}
            />
        </TabPanel>

    )

}