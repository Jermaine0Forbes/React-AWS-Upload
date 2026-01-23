// import React, { 
//     useState, 
//     // useEffect 
// } from 'react';
import {
    Outlet,
    Link,
    // useNavigate
} from "react-router";
import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import ScienceIcon from '@mui/icons-material/Science';
// import LoginDialog from '../components/dialogs/LoginDialog';
// import { DialogStatus} from "../types/index";




export default function DefaultLayout() {

    // const [open, setOpen] = useState<DialogStatus>(false);

    // const toggleOpen = (): void => {
    //     setOpen(!open);
    // }


    return (

        <>

            {/* <LoginDialog  open={open} setOpen={setOpen}/> */}
            <AppBar position="static" id="app-bar">
                <Grid
                    container
                    maxWidth={"xl"}
                >
                    <Grid size={3} className="app-bar-grid">
                        <Box
                            id="logo-section"
                        >
                            {/* <ScienceIcon /> */}
                            <Typography
                                component={Link}
                                to="/"
                                variant='h5'>

                                Uppy
                            </Typography>

                        </Box>
                    </Grid>
                    <Grid
                        className="app-bar-grid"
                        size={3}
                        offset={6}
                    >

                        <nav
                            id="nav-links">

                            <Button
                                className="links"
                                component={Link}
                                to="/content"
                            >
                                Content
                            </Button>

                            <Button
                                className="links"
                                component={Link}
                                to="/profile"
                            >
                                Profile
                            </Button>


                            <Button
                                //  onClick={toggleOpen}
                                className="links"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>

                            <Button
                                className="links"
                                component={Link}
                                to="/signup"
                            >
                                Signup
                            </Button>

                        </nav>

                    </Grid>
                </Grid>
            </AppBar>
            <Outlet />
        </>
    );
}