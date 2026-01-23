import Typography from "@mui/material/Typography";
import { TabPanel } from "../../components/TabPanel";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import type { TabPanelProps } from "../../interfaces";

export default function PanelNew({ value, index }: TabPanelProps) {

    return (
        <TabPanel value={value} index={index}>
            new content
            <form
                // onSubmit={handleSubmit(onSubmit)}
                id="upload-form"
            >
                <input type="file" name="files" multiple
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
        </TabPanel>

    )

}