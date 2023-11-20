import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import { PiCheckSquareOffsetBold } from "react-icons/pi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SalesTaskContent() {
  return (
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
  );
}
