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
import { registerUser } from '../../services/user';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import type { SignupValues} from '../../interfaces';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import FinalStep from './FinalStep';
import { SignupZod } from '../../services/zod';

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

    const zodInvalid = (form: FormData): boolean => {

       const result =  SignupZod.safeParse({
            username: form.get('username'),
            email: form.get('email'),
            password: form.get('password'),
            plan: form.get('plan'),
        })

        if(result.success){
            return false;
        }

        return true;
    };
    /*
        Might pass values as data to see if it's worth it,
        we'll see
    */
    const onSubmit: SubmitHandler<SignupValues> = (data) => {
        console.log(data)

        return;

        const wizardForm = formRef.current;
        if (!wizardForm) return;
        const form = new FormData(wizardForm);
        if (zodInvalid(form))
        {
            setStatusMsg("Invalid form state")
            return;
        }
        setStatusMsg(defaultMsg);
        form.append('tier_id', plan.toString());
        signupMutation.mutate(form)
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

                                <Step1 activeStep={activeStep} />
                                <Step2 activeStep={activeStep}/>
                                <Step3 activeStep={activeStep} />

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