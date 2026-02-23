import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getContent } from '../services/content';
import { Container, Skeleton, Typography } from '@mui/material';
import ContentBlock from '../components/ContentBlock';
import type { ContentData } from '../interfaces';

export default function Content() {
    const [content, setContent] = useState<ContentData[] | []>([])
    const { data, isLoading, error } = useQuery({
        queryKey: ['get-content'],
        queryFn: getContent,
        // staleTime: 0,
        // gcTime: 0,
    });

    useEffect(() => {
        if (error) {
            console.error(error)
        }
        if (data) {
            console.log('foo')
            setContent(data);
        }
    }, [data, error])

    if(Array.isArray(data) && data?.length === 0 && isLoading  === false) {

        return (
            <main id="content">
                <Typography variant='h3'>No content yet</Typography>
            </main>
        )
    }

    return (
        <main
            id="content">
            <Container maxWidth="md" component="section" id="content-container">

                {
                    data && !isLoading && !error && content.length > 0 ?
                        content.map((data, index) => {
                            const date = typeof data.created_at === "object" && "date" in data.created_at ? data.created_at?.date : "";
                            const d = typeof date === "string" ? date : '';
                            const dateStr: string = new Date(d).toLocaleDateString();
                            const TimeStr: string = new Date(d).toLocaleTimeString();
                            const created = dateStr + " around " + TimeStr;

                            return (
                                <ContentBlock key={index} {...data} created_at={created} />

                            );
                        })
                        :
                        <div>
                            <Skeleton variant="rectangular"
                                width={'100%'} height={80}
                                style={{ marginTop: '1em', display: 'block' }}
                            />
                            <Skeleton variant="rectangular"
                                width={'100%'} height={80}
                                style={{ marginTop: '1em', display: 'block' }}
                            />
                            <Skeleton variant="rectangular"
                                width={'100%'} height={80}
                                style={{ marginTop: '1em', display: 'block' }}
                            />
                            <Skeleton variant="rectangular"
                                width={'100%'} height={80}
                                style={{ marginTop: '1em', display: 'block' }}
                            />
                            <Skeleton variant="rectangular"
                                width={'100%'} height={80}
                                style={{ marginTop: '1em', display: 'block' }}
                            />
                        </div>
                }
            </Container>
        </main>
    )
}