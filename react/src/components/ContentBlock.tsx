import type { ContentData} from "../interfaces";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Link } from "react-router";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";


export default function ContentBlock({  id, path, name, views, created_at}: ContentData) {
    return (
        <Box
        className="content-block"
        >
            <Card className="content-card">
                <Link
                    to={`/media/${id}`}
                >
                <Grid container spacing={2} className="grid-group">
                    <Grid size={2} className="grid grid-1">
                        <Avatar className="avatar" src={path} variant="square" />

                    </Grid>
                    <Grid size={8} className="grid grid-2">
                        <Typography variant="h6" className="name">{name}</Typography>
                        <Typography variant="body2" className="created">Created at: {typeof created_at === "string" && created_at}</Typography>
                        <Typography variant="body2" className="views">Views: {views}</Typography>

                    </Grid>
                </Grid>


                </Link>


            </Card>
        </Box>

    )

}