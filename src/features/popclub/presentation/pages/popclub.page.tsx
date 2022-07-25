import { useAppDispatch, useAppSelector, useQuery } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams} from "react-router-dom";
import { FooterNavPopClub } from "../footer";
import { HeaderNavPopClub } from "../header";
import { PlatformChooserModal } from "../modals/platform-chooser.modal";
import { StoreChooserModal } from "../modals/store-chooser.modal";
import { getAllPlatformCategories, selectGetAllPlatformCategories } from "../slices/get-all-platform-categories.slice";
import { getAllPlatform, selectGetAllPlatform } from "../slices/get-all-platform.slice";
import { getDeals, selectGetDeals } from "../slices/get-deals.slice";
import { getPopClubData, selectGetPopClubData } from "../slices/get-popclub-data.slice";
import { selectSetPopClubData, setPopClubData } from "../slices/set-popclub-data.slice";


export function PopClub(){

    const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);

    const getAllPlatformState  = useAppSelector(selectGetAllPlatform);
    const getAllPlatformCategoriesState  = useAppSelector(selectGetAllPlatformCategories);
    const getPopClubDataState  = useAppSelector(selectGetPopClubData);
    const setPopClubDataState  = useAppSelector(selectSetPopClubData);
    const getDealsState  = useAppSelector(selectGetDeals);

    const dispatch = useAppDispatch();
    let { platform } = useParams();
    const query = useQuery();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getPopClubData());
    },[setPopClubDataState, dispatch]);

    useEffect(()=>{
        const category = query.get('category');

        if(platform !== undefined && category !== null){
            dispatch(getAllPlatform());
            dispatch(getAllPlatformCategories({platform_url_name: platform}));
            dispatch(getDeals({platform_url_name:platform, category_url_name: category}));
        }
        
    },[dispatch, platform, query, navigate]);
    

    return (
        <>
            <HeaderNavPopClub></HeaderNavPopClub>

            <section className="hidden sm:block">
                <img src={ REACT_APP_DOMAIN_URL + "uploads/images/desktop/banners/popclub.jpg"} alt="The best pop corn in town"></img>
                <img src={ REACT_APP_DOMAIN_URL + "uploads/images/instructions/popclub_instruction.jpg"} alt="The best pop corn in town"></img>
            </section>

            <section className="sm:hidden">
                <img src={ REACT_APP_DOMAIN_URL + "uploads/images/mobile/banners/popclub.jpg"} alt="The best pop corn in town"></img>
            </section>

            <section className="container lg:px-0 md:px-8 px-4 mx-auto py-4 ">
                <ul className="flex space-x-2">
                    {
                        getAllPlatformState.data.map((platformObj, i)=> (
                            <li key={i}>
                                <button 
                                    onClick={()=>{
                                        switch(platformObj.url_name){
                                            case 'snackshop':
                                                setOpenStoreChooserModal(true);
                                                break;
                                            case 'walk-in':
                                                dispatch(setPopClubData({platform : platformObj.url_name}));
                                                navigate(`../${platformObj.url_name}?category=all`);
                                                break;

                                        }
                                    }}
                                     className='text-2xl px-2 font-bold flex justify-center items-center space-x-1'>
                                    <span className={platform === platformObj.url_name ? 'text-primary' : ''}>{platformObj.name}</span>
                                </button>
                            </li>
                        ))
                    }
                </ul>
                
                <ul className="flex space-x-2">
                    {
                        getAllPlatformCategoriesState.data.map((category, i)=> (
                            <li key={i}>
                                <Link to={`?category=${category.url_name}`} className='text-gray-500 text-base px-2 font-bold flex justify-center items-center space-x-1'>
                                     <span className={category.url_name === query.get('category')? 'text-primary' : ''}>{category.name}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>

            <section className="container lg:px-0 md:px-8 px-4 mx-auto min-h-screen">
                <div className="flex flex-wrap">
                    {
                        getDealsState.data.map((deal, i)=>(
                            <Link key={i} to={`../deal/hash`} className='flex-[0_0_50%] p-[0.3rem] lg:flex-[0_0_20%] lg:pr-[0.7rem] lg:pb-[0.7rem]'>
                                <div className="relative flex flex-wrap flex-col bg-black shadow-lg rounded-[30px] h-full">
                                    <div className="absolute top-5 w-full">
                                        <div className=" md:w-2/5 w-3/5  bg-yellow-500 pl-2 text-white">{((deal.price - deal.discounted_price) / deal.price) * 100}%OFF</div>
                                        <div className="w-2/5 bg-red-500 pl-2 text-white">
                                        <div className="text-left md:text-[12px] text-[8px]  font-normal line-through">PHP{deal.price}</div>
                                        PHP {deal.discounted_price}
                                        </div>
                                    </div>
                                    
                                    <img alt="..." src={`https://ilovetaters.com/shop/assets/img/500/${deal.product_image}`} className=" rounded-t-[30px] card-clickable"/>
                                    <div className="mb-2 flex py-3 px-4">
                                        <h4 className="text-white">{deal.name}</h4>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>

            <FooterNavPopClub></FooterNavPopClub>

            

            <PlatformChooserModal platforms={getAllPlatformState.data} open={getPopClubDataState.data === null ?  true : false }></PlatformChooserModal>
            <StoreChooserModal open={openStoreChooserModal} onClose={()=>{
                setOpenStoreChooserModal(false);
            }}></StoreChooserModal>
        </>
    );
}