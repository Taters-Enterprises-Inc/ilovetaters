import {BrowserRouter as Router, Link} from 'react-router-dom';
import { LoginForm } from '../components/loginform';
import Loginimg from '../assets/loginlogo.png';

export function Admin(){

    return (
        <main className='bg-white'>
            <section className='bg-primary lg:w-1/4 max-h-auto text-white font-["Roboto"] text-sm text-center rounded-md shadow-md shadow-tertiary'>
                <div className='header_image grid grid-cols-1 sm:grid-cols-2'> 
                    <img src ={Loginimg} alt=''/>
                </div>
                <div className='login-body pt-4 pb-4 align-center'>
                    <LoginForm></LoginForm>
                </div>
                <form action=''></form>

            </section>

        
        </main>
    );
}