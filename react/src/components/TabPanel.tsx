import React from 'react';
import type { TabPanelProps } from '../interfaces';

export const TabPanel: React.FC<TabPanelProps> = (props): React.ReactElement => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            className='tab-content'
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    )
}