import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getContent } from '../services/content';
import { Container, Skeleton } from '@mui/material';

export default function Content() {

    const { data, isLoading, error } = useQuery({
        queryKey: ['get-content'],
        queryFn: getContent,
    });
    return (
        <main
            id="content">
            <Container maxWidth="md" component="section">

                {
                    data && !isLoading ?
                        <p> content</p>
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