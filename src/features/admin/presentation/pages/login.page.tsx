import {BrowserRouter as Router, Link} from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useEffect, useRef, useState } from "react";
import {styled} from '@mui/material/styles';

interface State {
    password: string;
    showPassword: boolean;
  }

export function Admin(){

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
      });
    
      const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
          setValues({ ...values, [prop]: event.target.value });
        };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

    return (
        <main className='bg-primary h-screen '>
            <section className='bg-secondary max-w-[400px] mx-auto p-6 px-6
             text-white font-["Roboto"] text-sm text-center rounded-3xl shadow-md shadow-tertiary'>
                <div className='header_image w-36 pt-2 pb-2'> 
                    <img src="https://ilovetaters.com/staging/uploads/images/shop/snackshop-logo-creamy-red.png" alt="taterslogo"></img>
                </div>
                <div className='login-body pt-4 pb-4'>
                    <form>
                    <p>Please login with your email/username and password below.</p>
                    <div className='mt-4 w-full'>
                        <TextField required id="email" label="Email" variant="outlined"/>
                    </div>
                    <div className='mt-4'>
                        <TextField required id="passw" label="Password" variant="outlined"/>
                    </div>
                    <div className='flex justify-between py-4'>
                        <p className='flex items-center'><input className='mr-2' type="checkbox"/> Remember Me</p>
                        <p>Forgot Password?</p>
                    </div>
                    <button className='w-full my-2 py-4 bg-button shadow-md rounded-lg'>LOGIN</button>
                    </form>
                </div>

            </section>

        
        </main>
    );
}