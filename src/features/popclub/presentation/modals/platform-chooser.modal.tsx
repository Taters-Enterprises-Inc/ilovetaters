import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import { PlatformModel } from 'features/popclub/core/domain/platform.model';
import { useNavigate} from "react-router-dom";
import { setPopClubData } from '../slices/set-popclub-data.slice';
import { useAppDispatch } from 'features/config/hooks';

import { Link } from "react-router-dom";

interface PlatformChooserModalProps{
  open : boolean,
  platforms: Array<PlatformModel>
}

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function PlatformChooserModal(props : PlatformChooserModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  return (
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={props.open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style} className='space-y-2'>
            <h1 className='text-center font-bold text-2xl'>Select a platform</h1>
            <ul className='flex'>
              {
                props.platforms.map((platform, i)=>(
                  <li key={i} className='flex-1 flex justify-center items-center font-semibold'>
                    <Link 
                    to={`../${platform.url_name}?category=all`}
                    className='text-gray-700' onClick={()=>{
                      dispatch(setPopClubData({platform: platform.url_name}));
                    }}>
                      {platform.name}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </Box>
        </Fade>
      </Modal>
  );
}
