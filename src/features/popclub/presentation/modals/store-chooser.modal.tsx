
import { useAppDispatch, useAppSelector, useQuery } from 'features/config/hooks';
import { StoreCluster } from '../components';
import { SearchAddress } from '../../../shared/presentation/components/inputs/search-address';
import { getSession, selectGetSession } from 'features/shared/presentation/slices/get-session.slice';
import { getStoresAvailable } from 'features/shared/presentation/slices/get-stores-available-slice';
import { useEffect, useState } from 'react';

interface StoreChooserModalProps {
  open : boolean,
  onClose: any,
}



export function StoreChooserModal(props : StoreChooserModalProps) {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState<any>('');
  const getSessionState = useAppSelector(selectGetSession);
  
  useEffect(()=>{
      dispatch(getSession());
  },[]);

  useEffect(()=>{
    if(getSessionState.data?.customer_address !== null){
      setAddress(getSessionState.data?.customer_address);
      
      
    }
  },[]);

  if(props.open){
    document.body.classList.add('overflow-hidden');
  }else {
    document.body.classList.remove('overflow-hidden');
  }

  return (
    <div
       style={{display: props.open? 'flex':'none'}}
      className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30 flex justify-center items-start overflow-auto'>
      <div className='bg-[#a21013] px-[10px] py-[30px] round w-[90%] lg:w-[80%] mt-10 relative rounded-[10px]'>

        <button className='absolute top-2 right-4 text-white' onClick={()=>{
          document.body.classList.remove('overflow-hidden');
          props.onClose();
        }}>X</button>

        <h1 className='text-white font-bold text-sm text-center pt-1 pb-2'>Which store do you want for online delivery?</h1>
        
        <div className='flex items-center justify-center mb-3'>
          <label className="pure-material-textfield-outlined w-[96%]">
            <SearchAddress onPlaceSelected={( place : string)=>{
              setAddress(place);
              dispatch(getStoresAvailable({address: place}));
            }}/>
            <span>Search Address</span>
          </label>
        </div>
        <StoreCluster onClose={props.onClose} address={address}></StoreCluster>
      </div>
    </div>
  );
}