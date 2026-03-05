
import  { useState} from 'react';
import { FormControl, TextField, FormGroup, FormLabel, Select, MenuItem} from "@mui/material";
import { useForm} from "react-hook-form"
import type { SignupValues } from '../../interfaces';


export default function Step3({activeStep = 0}:{activeStep:number}) {

    const [plan, setPlan] = useState<number>(1);

        const {
        register,
        // handleSubmit,
        // getValues,
        // watch,
        // formState: { errors },
    } = useForm<SignupValues>({
        defaultValues: {
            username: 'user1',
            password: 'password',
            email: 'jermaine0forbes@gmail.com',
            plan: 1,
        },
    });

    return (
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
    );
}