import {
    useEffect,
    useContext,
} from 'react';
import {
    Outlet,
    Link,
    useNavigate
} from "react-router";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AuthContext } from "../contexts";




export default function DefaultLayout() {
    const { state, dispatch } = useContext(AuthContext);
    const { cu, loggedIn } = state;
    const redirect = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('_token');
        dispatch({
            type: 'loggedOut',
            value: null,
        })
    };
    const checkStorage = () => {

        if (!loggedIn && cu == null) {
            // console.log(cu)
            // console.log('cu when logged out')
            redirect('.')
        }



    }
    useEffect(checkStorage, [loggedIn, cu]);





    return (

        <>

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
                            {

                                cu && loggedIn && typeof cu === "object" ?
                                    <>
                                        <Button
                                            className="links"
                                            component={Link}
                                            to={"/profile/" + cu?.id}
                                        >
                                            {'username' in cu && cu?.username}
                                        </Button>


                                        <Button
                                            className="links"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>


                                    </>

                                    :
                                    <>

                                        <Button
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

                                    </>
                            }



                        </nav>

                    </Grid>
                </Grid>
            </AppBar>
            <Outlet />
        </>
    );
}