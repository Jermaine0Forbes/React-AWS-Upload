import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams, useNavigate  } from 'react-router';
import PanelNew from './PanelNew';
import PanelProfile from './PanelProfile';
import PanelUploads from './PanelUploads';
import { useQuery } from "@tanstack/react-query";
import { getUser } from '../../services/user';


export default function Profile() {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const { id } = useParams<{ id: string }>();
    const userId: number =  id ? parseInt(id) : 0;
    const redirect = useNavigate();

    if(Number.isNaN(Number(id))) {
         redirect('/');
    }

    const {data: userData, isLoading, error} = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUser(userId),
    });

    useEffect(() => {
        console.log(userData)
        console.log(error)
        if((!isLoading && (!userData || userData.status === 404)) || error) {
            console.log("redirecting...");
             redirect('/');
        }   
    }, [isLoading, userData]);
   
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event)
        setTabIndex(newValue);
    };



    return (
        <main
            id="profile">
            <Container component="section" maxWidth="lg" className="group-container">
                <Typography
                    variant="h2"
                    className="username"
                >
                    Username
                </Typography>
                <section>
                    <Tabs
                        value={tabIndex}
                        aria-label="Profile Tabs"
                        onChange={handleChange}
                    >
                        <Tab label="New" />
                        <Tab label="Profile" />
                        <Tab label="Uploads" />
                    </Tabs>
                    <PanelNew userId={userId} value={tabIndex} index={0} />
                    <PanelProfile value={tabIndex} index={1} />
                    <PanelUploads value={tabIndex} index={2} />
                </section>
                <Grid className="group" container spacing={2}>
                    <Grid
                        size={{ md: 4 }} className="item item-1">

                    </Grid>
                </Grid>
            </Container>

        </main>
    )
}