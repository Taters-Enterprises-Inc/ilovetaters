import * as React from 'react';
import { useAppDispatch } from 'features/config/hooks';
import { getAllAvailableStores } from '../slices/get-all-available-stores.slice';
import { StoreClusterStoreVisit } from '../components';

interface StoreVisitStoreChooserModalProps {
  open : boolean,
  onClose: () => void,
}

export function StoreVisitStoreChooserModal(props : StoreVisitStoreChooserModalProps) {
  const dispatch = useAppDispatch();
  
  React.useEffect(()=>{
      dispatch(getAllAvailableStores({address: null}));
  },[]);
  
  if(props.open){
    document.body.classList.add('overflow-hidden');
  }

  return (
    <div
      style={{display: props.open? 'flex':'none'}}
      className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30 flex justify-center items-start overflow-auto'>
        <div className='bg-primary px-[5px] py-[13px] lg:p-8 round w-[90%] lg:w-[80%] mt-10 relative rounded-[10px]'>
          <button className='absolute top-2 right-4 text-white' onClick={()=>{
            document.body.classList.remove('overflow-hidden');
            props.onClose();
          }}>X</button>
          <StoreClusterStoreVisit onClose={props.onClose} address={null}></StoreClusterStoreVisit>
        </div>
    </div>
  );
}