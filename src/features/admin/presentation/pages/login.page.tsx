import {BrowserRouter as Router, Link} from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';


export function Admin(){

    return (
        <main className='bg-white'>
            <section className='bg-primary lg:w-1/4 max-h-auto text-white font-["Roboto"] text-sm text-center rounded-md shadow-md shadow-tertiary'>
                <div className='header_image w-36 pt-4 pb-4'> 
                    <img src="https://ilovetaters.com/staging/uploads/images/shop/snackshop-logo-creamy-red.png"></img>
                </div>
                <div className='login-body pt-4 pb-4 align-center'>
                    <form>
                    <p>Please login with your email/username and password below.</p>
                    <div>
                        <label>Email</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password"/>
                    </div>
                    <div>
                        <p><input type="checkbox"/> Remember Me</p>
                        <p>Forgot Password?</p>
                    </div>
                    <button>LOGIN</button>
                    </form>
                </div>

            </section>

        
        </main>
    );
}