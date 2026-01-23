import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Button, FormGroup, MenuItem, TextField } from '@mui/material';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props): React.ReactElement => {
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


export default function Profile() {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [tier, setTier] = useState<string>('free');
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event)
        setTabIndex(newValue);
    };

    const handleTier = (event: SelectChangeEvent) => {
        setTier(event.target?.value)
    }

    return (
        <main
            id="profile">
            <Container component="section" maxWidth="lg" className="group-container">
                <Typography
                    variant="h2"
                    className="username"
                >
                    Username
                </Typography>
                <section>
                    <Tabs
                        value={tabIndex}
                        aria-label="Profile Tabs"
                        onChange={handleChange}
                    >
                        <Tab label="New" />
                        <Tab label="Profile" />
                        <Tab label="Uploads" />
                    </Tabs>
                    <TabPanel value={tabIndex} index={0}>
                        new content
                        <form
                            // onSubmit={handleSubmit(onSubmit)}
                            id="upload-form"
                        >
                            <input type="file" name="files" multiple
                            // {...register("file")} 
                            />
                            <Typography
                                variant="h5"
                                className="title"
                            >
                                Drag and drop files here or click to select files to upload
                            </Typography>
                            <UploadFileIcon
                                className="upload-icon"
                            />
                            <button type="submit">Upload</button>
                        </form>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        profile content
                        <form>
                            <FormGroup
                                className="form-group"
                            >
                                <FormControl>
                                    <FormLabel>username</FormLabel>
                                    <TextField
                                        variant='standard'
                                        id="username"
                                        className="form-field"
                                    // {...register('username', { required: true })}
                                    />
                                </FormControl>
                            </FormGroup>
                            <FormGroup
                                className="form-group"
                            >
                                <FormControl>
                                    <FormLabel>email</FormLabel>
                                    <TextField
                                        variant='standard'
                                        id="email"
                                        className="form-field"
                                    // {...register('username', { required: true })}
                                    />
                                </FormControl>
                            </FormGroup>
                            <FormGroup
                                className="form-group"
                            >
                                <FormControl>
                                    <FormLabel>password</FormLabel>
                                    <TextField
                                        variant='standard'
                                        id="password"
                                        className="form-field"
                                    // {...register('username', { required: true })}
                                    />
                                </FormControl>
                            </FormGroup>
                            <FormGroup
                                className="form-group"
                            >
                                <FormControl>
                                    <FormLabel>plan</FormLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={tier}
                                        label="Select Tier"
                                        onChange={handleTier}
                                    >
                                        <MenuItem value={'free'}>Free</MenuItem>
                                        <MenuItem value={'basic'}>Basic</MenuItem>
                                        <MenuItem value={'advanced'}>Advanced</MenuItem>
                                    </Select>
                                </FormControl>
                            </FormGroup>
                            <Button type="submit">update profile</Button>
                        </form>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={2}>
                        uploads content
                    </TabPanel>
                </section>
                <Grid className="group" container spacing={2}>
                    <Grid
                        size={{ md: 4 }} className="item item-1">

                    </Grid>
                </Grid>
            </Container>

        </main>
    )
}