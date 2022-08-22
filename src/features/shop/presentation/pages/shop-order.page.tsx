import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav } from "features/shared";
import { REACT_APP_DOMAIN_URL, REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle, AiOutlineCloudUpload, AiOutlineCreditCard } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { Link, useLocation, useParams } from "react-router-dom";
import { ShopHeaderNav } from "../header/shop-header-nav.component";
import { getOrders, selectGetOrders } from "../slices/get-orders.slice";
import NumberFormat from "react-number-format";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ShopPageTitleAndBreadCrumbs } from "../components/shop-page-title-and-breadcrumbs";

export function ShopOrder(){
    const getOrdersState = useAppSelector(selectGetOrders);
    const [images, setImages] = useState<any>();
    const dispatch = useAppDispatch();
    let { hash } = useParams();
    const [uploadedFile, setUploadedFile] = useState<any>([]);
    const location = useLocation();
    
    const onDrop = useCallback((acceptedFiles : any) => {
        setUploadedFile(acceptedFiles[0]);
        
        
        acceptedFiles.map((file: any, index : any) => {
          const reader = new FileReader();
          reader.onload = function (e: any) {
            setImages({ id: index, src: e.target.result });
          };
          reader.readAsDataURL(file);
          return file;
        });
    }, []);
    
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [location]);

    

    
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false})

    useEffect(()=>{
        if(hash !== undefined){
            dispatch(getOrders({hash}));
        }
    },[]);
    
    const getStatus =(status : number | undefined, payops: number | undefined)=>{
      switch (status) {
        case 0: return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Incomplete Transaction</span>;
        case 1: return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Order Placed In System</span>;
        case 2: return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Payment under Verification</span>;
        case 3: 
          if(payops == 3){
            return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Order Confirmed</span>; 
          }else{
            return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Payment Confirmed</span>; 
          }
        case 4: return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Order Declined</span>;
        case 5: return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Order Cancelled</span>;
        case 6: return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Product Received by Customer</span>;
        case 7: return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Order Rejected due to Incorrect/Incomplete Payment</span>;
        case 8: return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Product currently being prepared</span>;
        case 9: return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Product en route to Customer</span>;
        default: return <span className="rounded-full bg-green-700 text-white px-2 py-1 text-[10px]">Error Transaction</span>;
      }
    }
    
    const handleProofOfPayment =(e : FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        

        if(uploadedFile){

            const formData = new FormData(e.currentTarget as HTMLFormElement);
            formData.append('uploaded_file', uploadedFile);
    
            axios.post(`${REACT_APP_DOMAIN_URL}api/shop/upload_payment`,formData,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },
                withCredentials: true
            }).then((response)=>{
                if(hash !== undefined){
                    dispatch(getOrders({hash}));
                }
            })
        }
        
    }


    return(
        <>
            <ShopPageTitleAndBreadCrumbs title="Order View" pageTitles={['Products', 'Order View']}/>

            <section className="min-h-screen container lg:space-x-4 pb-36">
                    
                <div className="lg:mt-[-80px]">
                    
                    <div className="flex lg:hidden">
                        <div className="flex-1">
                            <div className="bg-white h-[0.25rem] relative">
                                <div className="absolute rounded-[50%] bg-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">1</div>
                            </div>
                            <div className="flex justify-center items-center mt-5 text-xs text-white space-x-1 pl-4 lg:pl-0">
                                <BiUserCircle className="text-2xl"/> <span>Your Details</span>
                            </div>
                        </div>
                        
                        <div className="flex-1">
                            <div className="bg-[#424242] h-[0.25rem] relative">
                                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">2</div>
                            </div>
                            <div className="flex justify-center items-center mt-5 text-xs text-white space-x-1">
                                <AiOutlineCreditCard className="text-2xl"/> <span>Payment</span>
                            </div>
                        </div>

                        
                        <div className="flex-1">
                            <div className="bg-[#424242] h-[0.25rem] relative">
                                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">3</div>
                            </div>
                            <div className="flex justify-center items-center mt-5 text-xs text-white space-x-1 pr-4 lg:pr-0">
                                <AiOutlineCheckCircle className="text-2xl"/> <span>Complete</span>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-between items-start flex-col lg:flex-row">
                        <div className="space-y-8 lg:flex-[0_0_60%] lg:max-w-[60%]">
                            
                            <div className="pb-8 hidden lg:flex">
                                <div className="flex-1">
                                    <div className="bg-white h-[0.25rem] relative">
                                        <div className="absolute rounded-[50%] bg-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">1</div>
                                    </div>
                                    <div className="flex justify-center items-center mt-5 text-xs text-white space-x-1">
                                        <BiUserCircle className="text-2xl"/> <span>Your Details</span>
                                    </div>
                                </div>
                                
                                <div className="flex-1">
                                    <div className="bg-white h-[0.25rem] relative">
                                        <div className="absolute rounded-[50%] text-black font-bold bg-white h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">2</div>
                                    </div>
                                    <div className="flex justify-center items-center mt-5 text-xs text-white space-x-1">
                                        <AiOutlineCreditCard className="text-2xl"/> <span>Payment</span>
                                    </div>
                                </div>

                                
                                <div className="flex-1">
                                    <div className="bg-[#424242] h-[0.25rem] relative">
                                        <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">3</div>
                                    </div>
                                    <div className="flex justify-center items-center mt-5 text-xs text-white space-x-1">
                                        <AiOutlineCheckCircle className="text-2xl"/> <span>Complete</span>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-4">
                                <div className="text-white flex-1 space-y-2">
                                    <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">From: </h2>
                                    <h3 className="font-semibold text-xs">{getOrdersState.data?.order.clients_info.store_name}</h3>
                                    <h3 className="text-xs">{getOrdersState.data?.order.clients_info.store_address}</h3>
                                    <div className="text-xs">
                                        <strong>Contact #</strong> {getOrdersState.data?.order.personnel.contact_number}
                                    </div>
                                    <div className="text-xs">
                                        <strong>Email :</strong> {getOrdersState.data?.order.clients_info.store_email}
                                    </div>
                                </div>

                                <div className="text-white flex-1 space-y-2">
                                    <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">Deliver To Address: </h2>
                                    <h3 className="font-semibold text-xs">{getOrdersState.data?.firstname + ' ' + getOrdersState.data?.lastname}</h3>
                                    <div className="text-xs">
                                        <strong>Address:</strong> {getOrdersState.data?.order.clients_info.address}
                                    </div>
                                    <div className="text-xs">
                                        <strong>Email: </strong> {getOrdersState.data?.order.clients_info.email}
                                    </div>
                                </div>

                                <div className="text-white flex-1 space-y-2">
                                    <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">Tracking Information</h2>
                                    <div className="text-xs">
                                        <strong>Tracking Number:</strong> {getOrdersState.data?.order.clients_info.tracking_no}
                                    </div>
                                    <div className="text-xs space-x-2">
                                        <strong>Status:</strong> {getStatus(getOrdersState.data?.order.clients_info.status , getOrdersState.data?.order.clients_info.payops)}
                                    </div>
                                    <div className="text-xs">
                                        <strong>Mode of handling:</strong> Delivery
                                    </div>
                                    <div className="text-xs">
                                        <strong>Gift Card Number:</strong> 0
                                    </div>
                                </div>

                            </div>
                            <div className="text-white">
                                <h2 className="text-white font-['Bebas_Neue'] tracking-[3px] text-2xl mb-2">Orders</h2>

                                <hr className="mt-1 mb-4" />

                                <div className="space-y-6">
                                    {
                                        getOrdersState.data?.order.order_details.map((order,index)=>(
                                            <div className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px]">
                                                <img src={`https://ilovetaters.com/staging/v2/shop/assets/img/75/${order.product_image}`} className="rounded-[10px] w-[92px] h-[92px]" alt="" />
                                                <div className="flex-1 text-white px-3 py-2 flex flex-col">
                                                    <h3 className="text-sm">{order.product_label} {order.name}</h3>
                                                    <h3 className="text-xs">Quntity: <span className="text-tertiary">{order.quantity}</span></h3>
                                                    {
                                                        order.remarks ? 
                                                        <h3 className="text-xs">Flavor: <span className="text-tertiary">{order.remarks}</span></h3> 
                                                        : null
                                                    }
                                                    <h3 className="text-base flex-1 flex justify-end items-end">
                                                        <NumberFormat value={parseInt(order.calc_price).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
                                                    </h3>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            

                            <div className="flex lg:flex-row flex-col lg:space-x-2 space-y-2 lg:space-y-0">
                                <div className="text-white lg:flex-1">
                                    <h2 className="text-2xl font-['Bebas_Neue'] tracking-[3px]">Delivery Information</h2>
                                    <h3 className="font-semibold text-lg">{getOrdersState.data?.order.clients_info.add_name}</h3>
                                    <h3 className="text-sm">{getOrdersState.data?.order.clients_info.add_address}</h3>
                                    <h3 className="text-sm">{getOrdersState.data?.order.clients_info.add_contact}</h3>
                                </div>

                                <div className="text-white lg:flex-1">
                                    <h2 className="text-2xl font-['Bebas_Neue'] tracking-[3px]">Payment Options</h2>

                                    {
                                        getOrdersState.data?.order.bank.qr_code == "" ? 
                                        <>
                                            <img src={`https://ilovetaters.com/staging/v2/shop/assets/img/payops${getOrdersState.data?.order.bank.indicator}.png`} alt="" />

                                            {
                                                getOrdersState.data?.order.clients_info.payops != 3 ? 
                                                <div>
                                                    <div>
                                                        <strong>Account Name:</strong> {getOrdersState.data?.order.bank.bank_account_name}
                                                    </div>
                                                    <div>
                                                        <strong>Account #:</strong> {getOrdersState.data?.order.bank.bank_account_num}
                                                    </div>
                                                </div> : null
                                            }

                                        </>
                                        :  <img width="150" height="150" src={`https://ilovetaters.com/staging/v2/shop/assets/img/qr_codes/${getOrdersState.data?.order.bank.qr_code}`} alt="QR CODE"/>
                                    }
                                </div>
                            </div>


                        </div>

                        <div className="space-y-4 lg:flex-[0_0_36%] w-full lg:max-w-[36%] bg-primary lg:shadow-[#540808] lg:shadow-md lg:rounded-[30px] py-6 lg:px-4">
                            
                            <h2 className="font-['Bebas_Neue'] text-4xl  text-white tracking-[3px] text-center">Order Summary</h2>

                            <div className="grid grid-cols-2 text-white">
                                <span>Subtotal:</span>
                                <span className="text-end">
                                    <NumberFormat value={getOrdersState.data?.subtotal ? parseInt( getOrdersState.data.subtotal).toFixed(2) : 0.00} displayType={'text'} thousandSeparator={true} prefix={'₱'} /></span>
                                <span>Delivery Fee:</span>
                                <span className="text-end">
                                    + <NumberFormat value={getOrdersState.data?.delivery_fee ? parseInt( getOrdersState.data.delivery_fee).toFixed(2) : 0.00} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
                                </span>
                            </div>

                            <hr className="mt-1" />

                            <h1 className="text-3xl text-center text-white">
                                <NumberFormat value={getOrdersState.data?.grand_total ? getOrdersState.data.grand_total.toFixed(2) : 0.00} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
                            </h1>


                            {
                                getOrdersState.data?.order.clients_info.status === 1 ? 
                                <>
                                    <h2 className="font-['Bebas_Neue'] text-xl  text-white tracking-[3px] text-center">Upload Proof of Payment</h2>
                                    
                                    <form onSubmit={handleProofOfPayment}>


                                        <input type="text" className='hidden' name="tracking_no" value={getOrdersState.data?.order.clients_info.tracking_no} readOnly/>
                                        <input type="text" className='hidden' name="trans_id" value={getOrdersState.data?.order.clients_info.id}  readOnly/>

                                        <div>
                                            
                                            <div {...getRootProps()} className="border-dashed border-t-2 border-l-2 border-r-2 border-white h-[200px] rounded-lg flex justify-center items-center flex-col space-y-2">

                                                <input type='file' name='uploaded_file' {...getInputProps()} />
                                                
                                                {
                                                    isDragActive ?
                                                    <span className="text-white text-lg">Drop the files here ...</span>:
                                                    <>
                                                        {
                                                            images ? <img src={images.src} width={180} height={180}/> :
                                                            <>
                                                                <AiOutlineCloudUpload className="text-white text-5xl"/>
                                                                <span className="text-white text-lg">Drag and drop here to upload</span>
                                                                <button className="text-white text-lg bg-secondary px-3 py-1 rounded-lg">Or select file</button>
                                                            </>
                                                        }
                                                    </>
                                                }

                                            </div>

                                            <button type="submit" className="bg-button w-full text-white font-['Bebas_Neue'] tracking-[2px] text-2xl py-2 rounded-b-lg mt-[-10px]">
                                                Upload
                                            </button>

                                            <h4 className="text-white mt-1 leading-5 text-sm"><strong>Note:</strong> Supported file types: JPG, JPEG, PNG and GIF. Maximum file size is 2MB.</h4>
                                            
                                        </div>

                                    </form>
                                </>: getOrdersState.data?.order.clients_info.status == 2    ?  
                                    <h2 className="font-['Bebas_Neue'] text-xl flex justify-center items-center space-x-2 text-white rounded-xl bg-green-700 py-2 tracking-[3px] text-center">
                                        <AiFillCheckCircle className="text-2xl"/>
                                        <span>
                                            Proof of Pament Uploaded
                                        </span>
                                    </h2> : null
                            }
                            


                        </div>
                    </div>

                </div>
                
                
            </section>
        </>
    );
}