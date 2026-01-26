import Container from '@mui/material/Container';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getUserMedia } from '../services/content';
import { Skeleton } from '@mui/material';

export default function Media() {
    const { id } = useParams<{ id: string }>();
    const mediaId: number = id ? parseInt(id) : 0;
    const redirect = useNavigate();



    const { data, isLoading, error } = useQuery({
        queryKey: ['media', mediaId],
        queryFn: () => getUserMedia(mediaId),
    });

    if (Number.isNaN(Number(id)) || error) {
        redirect('/');
    }

    return (
        <main id="media">

            <Container maxWidth="lg" component={'section'}>
                <Card>
                    {
                        data && !isLoading ? (
                            <>
                                <CardMedia
                                    image={"path" in data ? data.path : ""}
                                />
                                <CardContent>

                                    <Typography className="name" variant="h1">Name</Typography>
                                    <Typography className="description" variant="body1">Description</Typography>
                                    <Typography className="views" variant="caption">Views</Typography>
                                    <Button className="profile-link" component={Link} to={'user/1'}>User</Button>
                                </CardContent>

                            </>
                        )
                            :
                            <div>
                                <Skeleton variant="rectangular"
                                    width={400} height={72}
                                    style={{ marginTop: '1em', display: 'block' }}
                                />

                                <Skeleton variant="rectangular"
                                    width={600} height={300}
                                    style={{ marginTop: '1em', display: 'block' }} />

                            </div>

                    }


                </Card>
            </Container>

        </main>

    );
}