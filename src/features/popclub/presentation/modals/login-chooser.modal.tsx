import axios from 'axios';
import { REACT_APP_DOMAIN_URL } from 'features/shared/constants';
import { BsFacebook } from 'react-icons/bs';

interface LoginChooserModalProps {
    open : boolean;
    onClose : () => void;
}

export function LoginChooserModal(props: LoginChooserModalProps){

    const facebook =()=> {
        props.onClose();
        axios.get(`${REACT_APP_DOMAIN_URL}api/facebook/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })
        .then(function (response: any) {
            const facebookURL = response.data.url;
            
            if (response.data.result === false) {
                axios.post(`${REACT_APP_DOMAIN_URL}api/facebook/login_point/`,{
                    fb_login_point: window.location.href 
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }).then(()=>{
                    window.location.href = facebookURL;
                });
            }
            
        })
    }
    return(
        <div
        style={{display: props.open? 'flex':'none'}}
        className='fixed inset-0 bg-[#22201A] bg-opacity-30 backdrop-blur-sm z-30 flex justify-center items-center '>
            <div className='bg-[#22201A] px-4 py-8 round w-[90%] rounded-lg relative text-white'>
                <button className='absolute top-2 right-4 text-white' onClick={props.onClose}>X</button>

                <h1 className="text-3xl font-['Bebas_Neue'] tracking-[3px] text-center">Hi! Welcome to Popclub</h1>
                <h2 className="text-xs text-center">Continue with us by connecting your existing account</h2>
                <button onClick={facebook} className="bg-blue-700 py-2 rounded-lg w-full flex justify-center items-center mt-4">
                   <BsFacebook className='mr-2'/>
                   <span>Continue with Facebook</span>
                </button>
            </div>
        </div>
    );
}