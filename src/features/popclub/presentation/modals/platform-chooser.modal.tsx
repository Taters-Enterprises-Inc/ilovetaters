import { PlatformModel } from 'features/popclub/core/domain/platform.model';
import { setPopClubData } from '../slices/set-popclub-data.slice';
import { useAppDispatch } from 'features/config/hooks';


interface PlatformChooserModalProps{
  open : boolean,
  platforms: Array<PlatformModel>,
  onSelectedPlatform: (platform : string) => void,
}

export function PlatformChooserModal(props : PlatformChooserModalProps) {
  const dispatch = useAppDispatch();

  const temp = [
    'visiting a store',
    'snacks delivered'
  ]

  return (
    <div
      style={{display: props.open? 'flex':'none'}}
      className='fixed inset-0 bg-[#22201A] bg-opacity-30 backdrop-blur-sm z-30 flex justify-center items-center '>
      <div className='bg-[#22201A] p-2 round w-[80%] sm:w-[400px] rounded-lg'>
        <h1 className='text-center text-xs text-white'>Are you?</h1>
          <ul className='flex'>
            {
              props.platforms.map((platform, i)=>(
                <li key={i} className='flex-1 flex justify-center items-center font-semibold'>
                  <button 
                  className=' font-bold text-xs lg:text-base text-white' onClick={()=>{
                    props.onSelectedPlatform(platform.url_name);
                    dispatch(setPopClubData({platform: platform.url_name}));
                  }}>
                    {temp[i]}
                  </button>
                </li>
              ))
            }
          </ul>
      </div>
    </div>
  );
}
