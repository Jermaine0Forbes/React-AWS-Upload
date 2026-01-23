import { TabPanel } from "../../components/TabPanel";
import type { TabPanelProps } from "../../interfaces";

export default function PanelUploads({ value, index }: TabPanelProps) {

    return (
        <TabPanel value={value} index={index}>
            uploads content
        </TabPanel>

    )

}