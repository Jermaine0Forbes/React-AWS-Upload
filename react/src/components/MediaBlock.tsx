import type { MediaBlockProps} from "../interfaces";
import  Block  from "@mui/icons-material/Block";
import  Grid  from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Link } from "react-router";
import  Typography from "@mui/material/Typography";


export default function MediaBlock({ userId, mediaId, path, name, description, views}: MediaBlockProps) {

    return (
        <Block
         component={Link}
         to={`/user/${userId}/media/${mediaId}`}
        >
            <Card>

            <Grid container spacing={2}>
                <Grid size={4}>
                    <img src={path}/>

                </Grid>
                <Grid size={8}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2">{description}</Typography>

                </Grid>
            </Grid>

            </Card>
        </Block>

    )

}