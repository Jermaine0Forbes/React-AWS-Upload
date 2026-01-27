// import React from 'react';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Container, FormControl, TextField, FormGroup, FormLabel, Button, Typography } from "@mui/material";
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/user';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts';


export default function Login() {
    const formRef = useRef(null);
    const [username, setUsername] = useState<string>('user1');
    const [password, setPassword] = useState<string>('password');
    const { state, dispatch } = useContext(AuthContext);
    const redirect = useNavigate();
    const { loggedIn, cu } = state;

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async (data) => {
            console.log(data);
            localStorage.setItem('current_user', JSON.stringify(data));
            dispatch({
                type: "loggedIn",
                value: data,
            });

        }
    });


    useEffect(() => {

        if (loggedIn && cu) {
            redirect('/profile/' + cu?.id);

        }

    }, [loggedIn])
    const handleSubmit = () => {
        const form = formRef.current;
        if (!form) return;
        const loginForm = new FormData(form);

        loginMutation.mutate(loginForm);
    }
    return (
        <main
            id="login">
            <Container id="login-container" maxWidth="sm" component="section">
                <Typography variant="h3">Login</Typography>
                <form ref={formRef}>

                    <FormGroup
                        className="form-group"
                    >
                        <FormControl>
                            <FormLabel>username</FormLabel>
                            <TextField
                                variant='standard'
                                id="username"
                                name="username"
                                className="form-field"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            // defaultValue={user?.username}
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
                                name="password"
                                className="form-field"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            // {...register('username', { required: true })}
                            />
                        </FormControl>
                    </FormGroup>
                </form>
                <Button onClick={handleSubmit}>Submit</Button>
            </Container>
        </main>
    )
}