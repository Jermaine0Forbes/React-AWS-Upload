import { useEffect, useState } from "react";
import { TabPanel } from "../../components/TabPanel";
import type { TabPanelProps } from "../../interfaces";
import MediaBlock from "../../components/MediaBlock";
import { useQuery } from "@tanstack/react-query";
import { getUserContent } from "../../services/content";
import {useUserContext } from "../../contexts";
import CircularProgress from "@mui/material/CircularProgress";
import { type MediaData } from "../../interfaces";
import { useParams } from "react-router";

export default function PanelUploads({ value, index }: TabPanelProps) {
    const { userData: user, tabIndex } = useUserContext();
    const [media, setMedia] = useState<MediaData[] | null | []>([])
    const [panelVisible, setPanelVisible] = useState<boolean>(false)
    const { id } = useParams<{ id: string }>();

    const { data: mediaData, isLoading, error } = useQuery({
        queryKey: ['get-user-content'],
        queryFn: () => getUserContent(Number(id)),
        refetchInterval: 3000,
        staleTime: 0,
        gcTime: 0,
    });



    useEffect(() => {
        if (error) {
            console.error(error)
        }
        if (Array.isArray(mediaData) && mediaData.length > 0 && panelVisible) {

            setMedia([...mediaData])
        }


        if (tabIndex || value) {

            setPanelVisible((tabIndex || value) === index)
        }

    }, [error, mediaData, setMedia, setPanelVisible, panelVisible, tabIndex, index])


    return (
        <TabPanel value={value} index={index} >
            {
                (isLoading || media?.length == 0) &&
                <div>
                    <CircularProgress />

                </div>
            }
            <div id="media-container">
                {
                    !isLoading && media !== null && media?.length > 0 && media.map((data, index) => {
                        return (<MediaBlock
                            key={index}
                            userId={user.id} mediaId={data.id} path={data.path}
                            name={data.name} description={data.description}
                            views={data.views}
                        />)

                    })
                }


            </div>
        </TabPanel>

    )

}