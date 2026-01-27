import { useContext, useEffect, useState } from "react";
import { TabPanel } from "../../components/TabPanel";
import type { TabPanelProps } from "../../interfaces";
import MediaBlock from "../../components/MediaBlock";
import { useQuery } from "@tanstack/react-query";
import { getGeneralContent } from "../../services/content";
import { AuthContext, useUserContext } from "../../contexts";
import  CircularProgress  from "@mui/material/CircularProgress";
import { type MediaData } from "../../interfaces";
import { useParams } from "react-router";

export default function GeneralUploads() {
    const { userData: user} = useUserContext();
    const [ media, setMedia] = useState<MediaData[] | null | []>([]) 
    // const [panelVisible, setPanelVisible] = useState<boolean>(false)
    const { id } = useParams<{ id: string }>();
    // const { state } = useContext(AuthContext);
    // const { loggedIn, cu } = state;
    const {data: mediaData, isLoading, error} = useQuery({
            queryKey: ['get-general-content'],
            queryFn: () => getGeneralContent( id ??  user?.id),
            // refetchInterval: 3000,
            // enabled: panelVisible
        });



        useEffect(() => {
            if(error){
                console.error(error)
            }
            if(Array.isArray(mediaData) && mediaData.length > 0 ) {

                setMedia([...mediaData])
            }


        },[error, mediaData, setMedia])


    return (
        <div>
            {
               ( isLoading || media?.length == 0 ) && 
                <div>
                    <CircularProgress/>

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


        </div>

    )

}