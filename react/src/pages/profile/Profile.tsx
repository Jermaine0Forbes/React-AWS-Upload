import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams, useNavigate } from 'react-router';
import PanelNew from './PanelNew';
import PanelProfile from './PanelProfile';
import PanelUploads from './PanelUploads';
import { useQuery } from "@tanstack/react-query";
import { getUser } from '../../services/user';
import { UserContext } from '../../contexts';
import { Skeleton } from '@mui/material';


export default function Profile() {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const { id } = useParams<{ id: string }>();
    const userId: number = id ? parseInt(id) : 0;
    const redirect = useNavigate();

    if (Number.isNaN(Number(id))) {
        redirect('/');
    }

    const { data: userData, isLoading, error } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUser(userId),
    });

    useEffect(() => {
        if ((!isLoading && (!userData || userData?.status === 404)) || error) {
            console.log("redirecting...");
            redirect('/');
        }
    }, [isLoading, userData]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setTabIndex(newValue);
    };



    return (
        <main
            id="profile">
            <UserContext.Provider value={{ userData, tabIndex }}>
                <Container component="section" maxWidth="lg" className="group-container">
                    {

                        userData ?
                            <Typography
                                variant="h2"
                                className="username"
                            >
                               {"username" in userData && userData?.username}
                            </Typography>
                            :

                            <Skeleton variant="rectangular"
                                width={400} height={72}
                                style={{ marginTop: '1em', display: 'block' }} />


                    }
                    <section>
                        {
                            userData ?

                                <>
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

                                </>
                                :

                                <Skeleton variant="rectangular"
                                    width={600} height={300}
                                    style={{ marginTop: '1em', display: 'block' }} />

                        }
                    </section>

                </Container>


            </UserContext.Provider>

        </main>
    )
}