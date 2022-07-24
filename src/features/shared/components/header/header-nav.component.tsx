import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { Link } from "react-router-dom";

interface HeaderNavProps {
    serviceReached: boolean,
}
export function HeaderNav(props: HeaderNavProps){
    return (
        <header className={`fixed w-full top-0 z-20 py-2 hidden lg:block ${props.serviceReached ? 'bg-red-700':''}`}>
            <nav className="flex justify-between items-center w-full container mx-auto px-3">
                <img src={REACT_APP_DOMAIN_URL + "uploads/images/logo/taters-logo.png"} alt="Taters Logo" className="w-[150px] lg:w-[160px]"></img>

                <div  className="justify-center items-center space-x-4 flex">
                    <ul className="flex text-white font-semibold items-stretch h-[40px] justify-center ">
                        <li className={`border-b-4  ease-in duration-200 border-white px-4 flex justify-center items-center font-bold tracking-wider`}>HOME</li>
                        <li className="px-4 pb-1 flex justify-center items-center tracking-wider">
                            <Link to="/popclub">POPCLUB</Link>
                        </li>
                        <li className="px-4 pb-1 flex justify-center items-center tracking-wider">
                            <a href="https://ilovetaters.com/shop">SNACKSHOP</a>
                        </li>
                        <li className="px-4 pb-1 flex justify-center items-center tracking-wider">
                            <a href="https://ilovetaters.com/catering">CATERING</a>
                        </li>
                        <li className="px-4 pb-1 flex justify-center items-center tracking-wider">
                            <a href="https://ilovetaters.com/branches">BRANCHES</a>
                        </li>
                    </ul>

                    <button className="bg-red-600 text-white mb-1 h-[40px] px-4 rounded-full uppercase font-semibold tracking-lg flex justify-center items-center">CONTACT US</button>
                </div>
            </nav>
        </header>
    );
}