import { useState } from 'react';
import Container from '@mui/material/Container';
import {
    Card, CardContent, CardMedia,
    Typography, Button, Dialog,
    DialogTitle, DialogContent
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getUserMedia } from '../services/content';
import { Skeleton, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Media() {
    const { id } = useParams<{ id: string }>();
    const [open, setOpen] = useState<boolean>(false);
    const mediaId: number = id ? parseInt(id) : 0;
    const redirect = useNavigate();



    const { data, isLoading, error } = useQuery({
        queryKey: ['media', mediaId],
        queryFn: () => getUserMedia(mediaId),
    });

    if (Number.isNaN(Number(id)) || error) {
        redirect('/');
    }

    const toggleOpen = () => { setOpen(!open)}
    return (
        <main id="media">


            <Container maxWidth="lg" component={'section'}>
                <Card>
                    {
                        data  && !isLoading ? (
                            <>
                                <CardMedia
                                    image={"path" in data ? data.path : ""}
                                    title={data.name}
                                    id="image"
                                    onClick={toggleOpen }
                                />
                                <CardContent>

                                    <Typography className="name" variant="h1">{data.name}</Typography>
                                    <Divider />
                                    <Typography className="description" variant="body1">Description:{data.description}</Typography>
                                    <Typography className="views" variant="caption">
                                        <VisibilityIcon />Views: {data.views}

                                    </Typography>
                                    <div>
                                        <Button className="profile-link" component={Link} to={`/profile/${data.userId}`}>{data.username}</Button>

                                    </div>
                                </CardContent>

                                <Dialog open={open} onClose={toggleOpen}>
                                    <DialogTitle>
                                        {data.name}
                                    </DialogTitle>
                                    <DialogContent>
                                        <img src={data.path} loading="lazy" style={{width:"100%"}}/>
                                    </DialogContent>
                                </Dialog>

                            </>
                        )
                            :
                            <div style={{padding:"1em"}}>
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