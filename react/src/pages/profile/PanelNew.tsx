import React, { useRef, useState } from 'react';
// import { useForm, SubmitHandler, FormProvider} from "react-hook-form"
import Typography from "@mui/material/Typography";
import { TabPanel } from "../../components/TabPanel";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { TabPanelProps } from "../../interfaces";
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { Button, FormGroup, TextField, Card, CardContent, Stack, FormControl } from '@mui/material';
import { Form } from 'react-router';

export default function PanelNew({ value, index }: TabPanelProps) {
    const [toggleFileInput, setToggleFileInput] = useState<boolean>(true);
    const [fileArr, setFileArr] = useState<Array<File>>([]);
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
            setToggleFileInput(false);
        }
    }

    const handleCancel = (): void => {
        setFileArr([]);
        setToggleFileInput(true);
    }

    const handleSubmit = (): void => {
        console.log(uploadInputRef.current)
        const uploadForm = uploadInputRef.current;
        if (!uploadForm) return;
        const contentData = new FormData(uploadForm);
        for( let f of contentData.entries()){
            console.log(f)
        }
        // handle file upload logic here
    }

    return (
        <TabPanel value={value} index={index}>
            new content
            <form
                // onSubmit={handleSubmit(onSubmit)}
                id="select-form"
                onClick={handleClick}
                className={toggleFileInput ? "file-input" : "file-input-toggle hidden"}
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
                className={!toggleFileInput ? "file-upload" : "file-upload hidden"}
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
                                                name={"filename[]"}
                                                // name={"filename-" + index}
                                                value={file.name}
                                            >
                                                {file.name}
                                            </TextField>
                                        </FormControl>

                                        <FormControl>
                                            <TextField
                                                variant='standard'
                                                id="description"
                                                name={"description[]"}
                                                // name={"description-" + index}
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
        </TabPanel>

    )

}