import {BrowserRouter as Router, Link} from 'react-router-dom';
import {FaRegEnvelope} from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { useState } from "react";
import { FooterNav, HomeHeaderNav } from "features/shared";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";


export function Login(){

    return (
        <main className='bg-primary h-screen '>

            <section className='grid h-screen place-items-center ml-2 mr-2'>
                <div className='bg-secondary max-w-[350px] mx-auto p-6 px-6 
              font-["Roboto"] text-sm text-center rounded-3xl shadow-md shadow-tertiary'>
                    <div className='header_image flex justify-center items-center'> 
                        <img src="https://ilovetaters.com/staging/uploads/images/shop/snackshop-logo-creamy-red.png" alt="taterslogo" className='w-36'></img>
                    </div>
                    
                    <div className='login-body pt-4'>
                        <form>
                        <p className='text-white'>Please login with your email/username and password below.</p>
                        <div className='mt-6 w-full p2 bg-gray-100 flex items-center rounded-2xl'>
                            {/* <TextField required id="email" label="Email" variant="outlined"/> */}
                            <FaRegEnvelope className='m-2'/>
                            <input type="text" name='email' placeholder='Email' className='bg-gray-100 w-full h-9 mr-4 outline-none text-sm flex-1'></input>
                        </div>
                        <div className='mt-4 w-full p2 bg-gray-100 flex items-center rounded-2xl'>
                            <MdLockOutline className='m-2'/>
                            <input type="password" name='passw' placeholder='Password' className='bg-gray-100 w-full mr-4 h-9 outline-none text-sm flex-1'></input>
                        </div>

                        <div className='flex justify-between py-4 text-white'>
                            <p className='flex items-center'><input className='mr-2' type="checkbox"/> Remember Me</p>
                            <a href='#'>Forgot Password?</a>
                        </div>
                        <button className='w-full my-2 py-2 bg-button shadow-md rounded-3xl text-white'>LOG IN</button>
                        </form>
                    </div>

                </div>

                

            </section>

        
        </main>
    );
}

