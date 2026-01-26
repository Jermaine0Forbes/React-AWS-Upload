// import React from "react";
import { useRouteError} from "react-router";
import { Container, Card,  CardContent, Typography } from "@mui/material";
// import ErrorIcon from '@mui/icons-material/Error';

export default function ErrorPage()
{
    const err: unknown | any = useRouteError();
    console.error(err)

    return(
        <Container maxWidth="lg" component={"main"} style={{marginTop:'1em'}}>
            <Card component={'section'}>
                <CardContent>
                    <Typography variant="h3">
                        {/* <ErrorIcon style={{fontSize:"1em"}}/> */}
                        Error
                    </Typography>
                    <Typography variant="subtitle1">
                    <p>Message: { err?.statusText || err?.message}</p>

                    </Typography>

                </CardContent>
            </Card>
        </Container>

    );
}