import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useSpring, animated } from '@react-spring/web';
import styled from '@emotion/styled';
import { usePlacesWidget } from "react-google-autocomplete";

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

interface StoreChooserModalProps {
  open : boolean,
  onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
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
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function StoreChooserModal(props : StoreChooserModalProps) {
  
  
  const { ref : materialRef } = usePlacesWidget({
    apiKey:'AIzaSyAi3QDkRTVGFyD4vuUS0lEx080Nm6GNsI8',
    onPlaceSelected: (place) => {
      console.log(place);
    },
    options: {
      types: ['geocode'],
      componentRestrictions: { country: "ph" },
    },
  });
  
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#ED1F24',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ED1F24',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#ED1F24',
      },
    },
  });

  return (
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={props.open}
        onClose={props.onClose}
      >
        <Fade in={props.open}>
          <Box sx={style} className='space-y-2'>
            <CssTextField inputRef={materialRef} label="Write your address." variant="outlined" fullWidth  />
          </Box>
        </Fade>
      </Modal>
  );
}