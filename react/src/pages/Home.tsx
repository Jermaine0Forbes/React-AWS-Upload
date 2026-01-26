import { Typography, Button } from "@mui/material"
import { Link } from "react-router"


export default function Home()
{
    return (
        <main
            id="home">
            <section id="banner">
                <Typography variant="h1" id="heading-1"> Welcome to Uppy!</Typography>
                <Typography variant="h3" id="heading-2">The number #1 site to upload anything!</Typography>
                <Typography variant="subtitle1" id="heading-3">Let's get you started by signing up</Typography>
                <Button component={Link} to={"/signup"} id="button">Signup</Button>
            </section>

        </main>
    )
}