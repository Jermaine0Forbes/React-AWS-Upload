import React, { useState, useRef, useContext, useEffect } from 'react';
import { Container, FormControl, TextField, FormGroup, FormLabel, Divider, Grid, Select, MenuItem, Snackbar } from "@mui/material";
import { useForm, type SubmitHandler} from "react-hook-form"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/user';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import type { SignupValues} from '../interfaces';

export default function Signup() {
    const stepTitles = ['Fill out Form', 'Choose Plan', 'Review'];
    const [activeStep, setActiveStep] = useState(0);
    const [plan, setPlan] = useState<number>(1);
    const [username, setUsername] = useState<string>('user1');
    const [email, setEmail] = useState<string>('jermaine0forbes@gmail.com');
    const [password, setPassword] = useState<string>('password');
    const defaultMsg = "All steps completed - you're finished";
    const [statusMsg, setStatusMsg] = useState<string>(defaultMsg);
    const [notifyOpen, setNotifyOpen] = useState<boolean>(false);
    const [skipped, setSkipped] = useState(new Set<number>());
    const formRef = useRef(null);
    const redirect = useNavigate();
    const { state, dispatch } = useContext(AuthContext);
    const { loggedIn, cu } = state;



            const {
            register,
            handleSubmit,
            getValues,
            // watch,
            formState: { errors },
        } = useForm<SignupValues>({ defaultValues : {
                username: 'user1',
                password: 'password',
                email: 'jermaine0forbes@gmail.com',
                plan: 1,
            },});



    useEffect(() => {

        if (loggedIn && cu) {
            redirect('/profile/' + cu?.id);

        }

    }, [loggedIn])

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };


    const signupMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: async (data) => {
            console.log(data);
            localStorage.setItem('_token', data?.token);
            dispatch({
                type: "loggedIn",
                value: data,
            });

        },
        onError: async (error) => {
            setNotifyOpen(true);
            setStatusMsg(error?.message)
        }
    });

    /*
        Might pass values as data to see if it's worth it,
        we'll see
    */
    const onSubmit: SubmitHandler<SignupValues> = (data) => {
        console.log(data)

        return;

        // const wizardForm = formRef.current;
        // if (!wizardForm) return;
        // const form = new FormData(wizardForm);
        // setStatusMsg(defaultMsg);
        // form.append('tier_id', plan.toString());
        // signupMutation.mutate(form)
    }

    const handleNext = () => {

        if (activeStep === stepTitles.length - 1) {
            handleSubmit(onSubmit)();
        }
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <main
            id="signup">
            <Container id="signup-container" maxWidth="lg" component="section">
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h4">Register as a new user</Typography>
                    <Stepper activeStep={activeStep}>
                        {stepTitles.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};
                            // if (isStepOptional(index)) {
                            //     labelProps.optional = (
                            //         <Typography variant="caption">Optional</Typography>
                            //     );
                            // }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === stepTitles.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                {statusMsg}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>

                            <form ref={formRef}>


                                <div className={activeStep === 0 ? 'step-group' : 'step-group hidden'}>

                                    <FormGroup
                                        className="form-group"
                                    >
                                        <FormControl>
                                            <FormLabel>username</FormLabel>
                                            <TextField
                                                variant='standard'
                                                id="username"
                                                // name="username"
                                                className="form-field"
                                                value={username}
                                                // onChange={(e) => setUsername(e.target.value)}
                                            // defaultValue={user?.username}
                                            {...register('username', { required: true })}
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
                                                // name="email"
                                                className="form-field"
                                                type="email"
                                                value={email}
                                                // onChange={(e) => setEmail(e.target.value)}
                                            // defaultValue={user?.email}
                                            {...register('email', { required: true })}
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
                                                // name="password"
                                                className="form-field"
                                                type="password"
                                                // value={password}
                                                // onChange={(e) => setPassword(e.target.value)}
                                            {...register('password', { required: true })}
                                            />
                                        </FormControl>
                                    </FormGroup>

                                </div>
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

                                <div className={activeStep === 2 ? 'step-group' : 'step-group hidden'}>


                                    <FormGroup
                                        className="form-group"
                                    >
                                        <FormControl>
                                            <FormLabel>username</FormLabel>
                                            <TextField
                                                variant='standard'
                                                id="username"
                                                className="form-field"
                                                // value={username}
                                                disabled
                                            // defaultValue={user?.username}
                                            {...register('username', { required: true })}
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
                                                type="email"
                                                // value={email}
                                                disabled
                                            // defaultValue={user?.email}
                                            {...register('email', { required: true })}
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
                                                // name="password"
                                                className="form-field"
                                                type="password"
                                                // value={password}
                                                disabled
                                            {...register('password', { required: true })}
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
                                                value={plan}
                                                label="Select Tier"
                                                disabled
                                            // onChange={handleTier}
                                            >
                                                <MenuItem value={1}>Free</MenuItem>
                                                <MenuItem value={2}>Basic</MenuItem>
                                                <MenuItem value={3}>Advanced</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </form>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                        Skip
                                    </Button>
                                )}
                                <Button onClick={handleNext}>
                                    {activeStep === stepTitles.length - 1 ? 'Register' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </Container>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={notifyOpen}
                onClose={() => setNotifyOpen(false)}
                message={statusMsg}
                autoHideDuration={3000}
                className="error"
                id="notify-open"
                action={
                    <IconButton
                        aria-label="close"
                        onClick={() => setNotifyOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            />
        </main>
    )
}