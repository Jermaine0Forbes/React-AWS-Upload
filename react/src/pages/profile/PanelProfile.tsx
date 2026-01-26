import { useState } from 'react';

// import Typography from "@mui/material/Typography";
import { TabPanel } from "../../components/TabPanel";
import type { TabPanelProps } from "../../interfaces";
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Button, FormGroup, MenuItem, TextField } from '@mui/material';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useUserContext } from "../../contexts";

export default function PanelProfile({ value, index }: TabPanelProps) {
    const { userData: user} = useUserContext();
    const [tier, setTier] = useState<string>(user?.tier ?? '');
    const handleTier = (event: SelectChangeEvent) => {
        setTier(event.target?.value)
    }

    return (
        <TabPanel value={value} index={index}>
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
                            defaultValue={user?.username}
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
                            defaultValue={user?.email}
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
                            <MenuItem value={'Free'}>Free</MenuItem>
                            <MenuItem value={'Basic'}>Basic</MenuItem>
                            <MenuItem value={'Advanced'}>Advanced</MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup>
                <Button type="submit">update profile</Button>
            </form>
        </TabPanel>

    )

}