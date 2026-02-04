import React, { useRef, useState, useEffect, useContext } from 'react';
// import { useForm, SubmitHandler, FormProvider} from "react-hook-form"
import Typography from "@mui/material/Typography";
import { TabPanel } from "../../components/TabPanel";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { PanelNewProps, QuotaData } from "../../interfaces";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { Button, FormGroup, TextField, Card, CardContent, Stack, FormControl } from '@mui/material';
import { useMutation, useQuery } from "@tanstack/react-query";
import { postProfileUpload } from '../../services/profile';
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from '@mui/material';
import { AuthContext} from "../../contexts";
import { getQuota } from '../../services/user';
import ReportIcon from '@mui/icons-material/Report';

export default function PanelNew({ value, index, userId }: PanelNewProps) {
    const [fileInputStatus, setFileInputStatus] = useState<number>(1);

    const [fileArr, setFileArr] = useState<Array<File>>([]);
    const [notifyMsg, setNotifyMsg] = useState<string>("");
    const [notifyOpen, setNotifyOpen] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const uploadInputRef = useRef<HTMLFormElement | null>(null);
    const { state } = useContext(AuthContext);
    const { userData: user, cu } = state;

    console.log('user')
    console.log(user)
    const defaultQuota = { max: user?.max, current: user?.current, remainder: user?.max - user?.current };
    const [quota, setQuota] = useState<QuotaData>(defaultQuota)
    const initBanner = `${user?.tier} Plan: You have ${quota?.remainder} uploads left this month`;
    const [bannerMsg, setBannerMsg] = useState<string>(initBanner);

    const handleClick = (): void => {
        fileInputRef.current?.click();
    }

    const isExceeding = (size: number) => {
        const { max, current } = quota;

        if (max < current + size) {
            setBannerMsg("This upload will exceed your quota, try again!")
            setQuota({ ...quota, exceeding: true })
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (files) {
            const arr = Array.from(files);
            setFileArr(arr);
            setFileInputStatus(2);
            isExceeding(files?.length);
        }
    }

    const handleCancel = (): void => {
        setFileArr([]);
        setFileInputStatus(1);
        setBannerMsg(initBanner)
        setQuota({ ...quota, exceeding: false })
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

    const { data, isSuccess } = useQuery({
        queryKey: ['get-quota'],
        queryFn: () => getQuota(cu?.id),
        enabled: notifyOpen,
        gcTime: 0,
        staleTime:0,
    });


    const maxedOut = () => {
        console.log('maxed out')
        setFileInputStatus(5);
        setBannerMsg("You have maxed out your upload quota for this month")
    };

    useEffect(() => {
        if (quota?.remainder === 0) {
            maxedOut();
        }

        if (isSuccess && data && 'remainder' in data && quota?.current !== data?.current && user?.max == data.max) {
            const { remainder } = data;

            // console.log('data')
            // console.log(data)

            switch (remainder) {
                case 0:
                    maxedOut();
                    break;
                default:
                    setBannerMsg(`${user?.tier} Plan: You have ${remainder} uploads left this month!`)
            }
            setQuota({ ...data })

        }

    }, [isSuccess, data, setBannerMsg, quota]);

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
            fileData.append("file-" + i, fileArr[i]);
            fileData.append("metadata-" + i, JSON.stringify(metadata));

        }
        uploadMutation.mutate({ id: userId, data: fileData });
    }

    return (
        <TabPanel value={value} index={index}>
            <div className="notification-banner">
                {bannerMsg}
            </div>
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
                <Button onClick={handleSubmit} disabled={quota?.exceeding || quota?.remainder === 0}>upload</Button>
            </div>
            <div
                className={fileInputStatus == 3 ? "file-upload" : "file-upload hidden"}
            >
                <CircularProgress />
            </div>
            <div
                className={fileInputStatus == 4 ? "file-upload" : "file-upload hidden"}
            >
                <Typography variant="h3" className="max-message"><ReportIcon /> Maxed Out!</Typography>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={notifyOpen}
                onClose={() => setNotifyOpen(false)}
                message={notifyMsg}
                autoHideDuration={3000}
            />
        </TabPanel>

    )

}