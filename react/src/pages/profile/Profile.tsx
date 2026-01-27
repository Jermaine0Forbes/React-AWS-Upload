import React, { useState, useEffect, useContext } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams, useNavigate } from 'react-router';
import PanelNew from './PanelNew';
import PanelProfile from './PanelProfile';
import PanelUploads from './PanelUploads';
import GeneralUploads from './GeneralUploads';
import { useQuery } from "@tanstack/react-query";
import { getUser } from '../../services/user';
import { AuthContext, UserContext } from '../../contexts';
import { Skeleton } from '@mui/material';


export default function Profile() {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [isUser, setIsUser] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const userId: number = id ? parseInt(id) : 0;
    const redirect = useNavigate();
    const { state, dispatch } = useContext(AuthContext);
    const { cu, loggedIn } = state;

    if (Number.isNaN(Number(id))) {
        redirect('/');
    }

    const { data: userData, isLoading, error } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUser(userId),
        staleTime: 0,
        gcTime: 0,
    });

    useEffect(() => {
        if ((!isLoading && (!userData || userData?.status === 404)) || error) {
            console.log("redirecting...");
            redirect('/');
        }
        if (userData && "id" in userData) {
            console.log('userData')
            console.log(userData)
            dispatch({
                type: "gotUser",
                value: userData,
            })

            if (loggedIn && cu?.id == userData?.id && !isUser) {
                setIsUser(true);
            }
        }
    }, [isLoading, userData, cu, loggedIn]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setTabIndex(newValue);
    };

    const MainComponent = () => {

        if (isUser) {

            return (

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
            );
        }

        return (
            <GeneralUploads/>
        );
    }
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
                            !userData ?

                                (

                                    <Skeleton variant="rectangular"
                                        width={600} height={300}
                                        style={{ marginTop: '1em', display: 'block' }} />
                                )
                                :

                                <MainComponent />
                        }

                    </section>

                </Container>


            </UserContext.Provider>

        </main>
    )
}