import type { MediaBlockProps } from "../interfaces";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Link } from "react-router";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";


export default function MediaBlock({  mediaId, path, name, description, views }: MediaBlockProps) {
    return (
        <Box
        className="media-block"
        >
            <Card className="media-card" variant="outlined">
                <Link
                    to={`/media/${mediaId}`}
                >
                <Grid container spacing={2} className="grid-group">
                    <Grid size={1} className="grid grid-1">
                        <Avatar src={path} />

                    </Grid>
                    <Grid size={8} className="grid grid-2">
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="body2">Description: {description}</Typography>
                        <Typography variant="body2">Views: {views}</Typography>

                    </Grid>
                </Grid>


                </Link>


            </Card>
        </Box>

    )

}