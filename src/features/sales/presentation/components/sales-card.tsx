import { PiCheckSquareOffsetBold } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function SalesCard() {
  return (
    <>
      <div className="flex flex-col rounded-md shadow-sm bg-white w-full md:w-3/3">
        <div className="flex flex-col bg-secondary rounded-t-md text-white text-4xl font-['Bebas_Neue'] flex-1 p-4">
          <span className="p-3"></span>
        </div>
        <div className="flex flex-col bg-white rounded-b-lg font-['Roboto'] flex-1 p-4">
          <div className="flex flex-row-reverse px-5">
            <Button variant="outlined">
              <PiCheckSquareOffsetBold size={20} />
            </Button>
          </div>
          <div className="p-5">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="hover:bg-neutral-300 hover:text-neutral-950"
                sx={{
                  backgroundColor: "#f0f1f2",
                  borderRadius: 1,
                }}
              >
                <span className="font-semibold">General Information</span>
              </AccordionSummary>
              <AccordionDetails>
                <div className="p-5">
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    placeholder="Text here..."
                    disabled
                    fullWidth
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="flex flex-row justify-center p-5 space-x-5">
            <Button variant="contained" className="w-1/6">
              Reject
            </Button>
            <Button variant="contained" className="w-1/6">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
