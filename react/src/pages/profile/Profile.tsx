import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PanelNew from './PanelNew';
import PanelProfile from './PanelProfile';
import PanelUploads from './PanelUploads';


export default function Profile() {
    const [tabIndex, setTabIndex] = useState<number>(0);
   
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
                    <PanelNew value={tabIndex} index={0} />
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