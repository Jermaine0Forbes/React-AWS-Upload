
import { useState} from 'react';
import { Container, FormGroup,  Divider, Grid} from "@mui/material";
// import { useForm, type SubmitHandler } from "react-hook-form"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Step2({activeStep = 0}: {activeStep: number}) {
    const [plan, setPlan] = useState<number>(1);

    return (
        <div className={activeStep === 1 ? 'step-group' : 'step-group hidden'}>

            <FormGroup
                className={'form-group'}
            >
                <Container maxWidth="md">
                    <Grid container spacing={10}>

                        <Grid size={4}>

                            <Box className={plan == 1 ? "tier-plan active" : "tier-plan"}>
                                <Typography variant="h4">Free</Typography>
                                <Divider />
                                <Typography className="heading-1" variant="body1">Upload up to</Typography>
                                <Typography className="heading-2" variant="h2">4</Typography>
                                <Typography className="heading-3" variant="body1">images</Typography>
                                <Typography className="heading-4" variant="caption">per month</Typography>
                                <Button className="button" onClick={() => setPlan(1)}>Choose Plan</Button>

                            </Box>

                        </Grid>
                        <Grid size={4}>

                            <Box className={plan == 2 ? "tier-plan active" : "tier-plan"}>
                                <Typography variant="h4">Basic</Typography>
                                <Divider />
                                <Typography className="heading-1" variant="body1">Upload up to</Typography>
                                <Typography className="heading-2" variant="h2">8</Typography>
                                <Typography className="heading-3" variant="body1">images</Typography>
                                <Typography className="heading-4" variant="caption">per month</Typography>
                                <Button className="button" onClick={() => setPlan(2)}>Choose Plan</Button>

                            </Box>

                        </Grid>
                        <Grid size={4}>

                            <Box className={plan == 3 ? "tier-plan active" : "tier-plan"}>
                                <Typography variant="h4">Advanced</Typography>
                                <Divider />
                                <Typography className="heading-1" variant="body1">Upload up to</Typography>
                                <Typography className="heading-2" variant="h2">12</Typography>
                                <Typography className="heading-3" variant="body1">images</Typography>
                                <Typography className="heading-4" variant="caption">per month</Typography>
                                <Button className="button" onClick={() => setPlan(3)}>Choose Plan</Button>

                            </Box>

                        </Grid>
                    </Grid>
                </Container>
            </FormGroup>

        </div>
    );
}