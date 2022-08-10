import { PlatformModel } from 'features/popclub/core/domain/platform.model';
import { setPopClubData } from '../slices/set-popclub-data.slice';
import { useAppDispatch } from 'features/config/hooks';
import { REACT_APP_BASE_NAME } from 'features/shared/constants';
import { useNavigate } from 'react-router-dom';


interface PlatformChooserModalProps{
  open : boolean,
  platforms: Array<PlatformModel>,
  onSelectedPlatform: (platform : string) => void,
}

export function PlatformChooserModal(props : PlatformChooserModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const temp = [
    'visiting a store',
    'snacks delivered'
  ]

  return (
    <div
      style={{display: props.open? 'flex':'none'}}
      className='fixed inset-0 bg-secondary bg-opacity-30 backdrop-blur-sm z-30 flex justify-center items-center '>
      <div className='bg-secondary p-4 round w-[80%] sm:w-[400px] rounded-lg relative'>

        <button className='absolute top-2 right-4 text-white' onClick={()=>{
          if(REACT_APP_BASE_NAME)
            navigate(-1);
        }}>X</button>

          <h1 className='text-center text-xs text-white '>Are you</h1>
          <ul className=' space-y-1' >
            {
              props.platforms.map((platform, i)=>(
                <li key={i} className='flex-1 flex flex-col justify-center items-center'>
                  <button 
                  className=' text-sm w-full lg:text-base rounded-lg bg-transparent text-white py-3 px-10 border border-white mt-2 tracking-widest font-["Bebas_Neue"]' onClick={()=>{
                    props.onSelectedPlatform(platform.url_name);
                    dispatch(setPopClubData({platform: platform.url_name}));
                  }}>
                    {temp[i]}?
                  </button>
                  { i === 0 ? <h1 className='text-center text-xs text-white mt-3'>or having your</h1> : null}
                </li>
              ))
            }
          </ul>
      </div>
    </div>
  );
}
