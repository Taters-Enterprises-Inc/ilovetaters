import { useEffect } from "react";
import { AiFillCreditCard } from "react-icons/ai";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@mui/material/styles/styled";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#22201A" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "transparent",
  borderBottom: "1px solid #22201A",
  padding: 0,
  color: "#22201A",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "transparent",
  color: "#22201A",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export function PaymentAccordion() {
  const getSessionState = useAppSelector(selectGetSession);
  const dispatch = useAppDispatch();

  return (
    <FormControl className="w-full">
      <RadioGroup aria-labelledby="payops aria label" name="payops">
        {getSessionState.data?.payops_list.map((payops, i) => (
          <Accordion key={i} defaultExpanded={i === 0 ? true : false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-secondary" />}
            >
              <div className="flex items-center justify-start flex-1 space-x-4">
                <AiFillCreditCard className="text-2xl text-primary" />{" "}
                <span>Pay with {payops.name}</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                value={payops.id}
                control={<Radio color="primary" required />}
                label={
                  payops.name === "CASH"
                    ? payops.name + " (additional ₱ 50.00)"
                    : payops.name
                }
              />
              <ul>
                {payops.acct_name ? (
                  <li className="text-lg">Account Name: {payops.acct_name}</li>
                ) : null}
                {payops.acct ? (
                  <li className="text-lg">Account Name: {payops.acct}</li>
                ) : null}
              </ul>
              {payops.qr_code ? (
                <img
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/qr_codes/${payops.qr_code}`}
                  alt="Taters G-Cash QR"
                  width={230}
                />
              ) : null}
            </AccordionDetails>
          </Accordion>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
