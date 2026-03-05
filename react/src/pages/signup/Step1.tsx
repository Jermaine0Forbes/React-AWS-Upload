
// import React, { useState, useRef, useContext, useEffect } from 'react';
import {  FormControl, TextField, FormGroup, FormLabel} from "@mui/material";
import { useForm} from "react-hook-form"
import type { SignupValues } from '../../interfaces';


export default function Step1({ activeStep}:{activeStep: number}) 
{

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
                        // value={username}
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
                        // value={email}
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
    );
}