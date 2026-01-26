import Container from '@mui/material/Container';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router';

export default function Media()
{

    return(
        <main id="media">

            <Container maxWidth="lg" component={'section'}>
                <Card>
                    <CardMedia />
                    <CardContent>

                        <Typography className="name" variant="h1">Name</Typography>
                        <Typography className="description" variant="body1">Description</Typography>
                        <Typography className="views" variant="caption">Views</Typography>
                        <Button className="profile-link" component={Link} to={'user/1'}>User</Button>
                    </CardContent>


                </Card>
            </Container>

        </main>

    );
}