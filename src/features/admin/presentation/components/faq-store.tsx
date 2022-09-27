import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={5} square={false} {...props} />
))(({ theme }) => ({
  backgroundColor: "#22201A",
  color: "white",
  border: "",

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
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
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
  borderTop: "1px solid rgba(255,255,255, 0.9)",

  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
}));

export default function CustomizedAccordionsSFAQ() {
  const [expanded, setExpanded] = React.useState<string | false>("panel0");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel0"}
        onChange={handleChange("panel0")}
      >
        <AccordionSummary aria-controls="panel0d-content" id="panel0d-header">
          <Typography>
            <b>Who can Cater to Clients?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            All Taters stores can offer catering services given that they have
            the equipment, stocks, enough manpower, and catering knowledge.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            <b>Can my store join the Catering System?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We will only include all stores that have their OWN Table or Cart
            Set-up in the system TEI Carts and Table Set-up is only available
            for RENT if they're a TEI owned store.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>
            <b>How much is a Catering Cart? Table Set-up?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>N/A</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>
            <b>What are the designs for the Catering Cart? Table Set-up?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            For the cart, we have two designs: Rustic and Sporty For the Table
            Set-up, we have our standard table set-up
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>
            <b> Can we offer discounts?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The new catering packages are already discounted (ranging from 3% to
            10%). But if you still wish to offer more discounts for the package
            price, this will be decided by the Store Managing Partner or Area
            Manager
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>
            <b>Client is asking to withhold tax. What to do?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We only allow withholding tax if they can present a BIR 2307 OR PEZA
            Certificate Withtholding Tax = 1% for Product ; 2% for Service Fee *
            this will be computed by the finance of the client. Make sure to
            inform them about the %.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>
            <b>Client is requesting for SOA and SI. How to proceed?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            For Full Franchised Stores, you should be able to create your own
            SOA and SI For TEI / Family-Owned Stores, you could request for a
            SOA from TEI Finance. SI is up to the store.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>
            <b>How to punch Catering Transactions?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Special Sales (including Catering) is NOT punched in the POS but IS
            adjusted in the IMS (stock inventory adjustment) <br />
            For Full Franchised Community Stores, you can punch your Catering
            Transactions in the POS by clicking the Catering Packages Button.
            Discounts will be applied via Price Discount button.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography>
            <b>How to prepare Catering Packages on the day of the event?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Coordinate with Sir Jayson.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography>
            <b>Client is requesting for a claim stub, what should we do?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Claim stubs should be in care of the client.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel10"}
        onChange={handleChange("panel10")}
      >
        <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
          <Typography>
            <b>Do you offer further discounts?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Any further discounts for bulk or loyal customers are subject for
            review and approval by Taters management.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel11"}
        onChange={handleChange("panel11")}
      >
        <AccordionSummary aria-controls="panel11d-content" id="panel11d-header">
          <Typography>
            <b>Accreditation Process</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>N/A</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12")}
      >
        <AccordionSummary aria-controls="panel12d-content" id="panel12d-header">
          <Typography>
            <b>Where can we get a trucking service?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can email sir Noel if the truck is available to cater to your
            event or you could book via third party courier (Transportify /
            Lalamove / Kickstart)
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel13"}
        onChange={handleChange("panel13")}
      >
        <AccordionSummary aria-controls="panel13d-content" id="panel13d-header">
          <Typography>
            <b>How do we compute for the Package Grand Total?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Package Price (less) discounts = Total Package Price + 10% Service
            Charge + Transpo Fee + Other Fees
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel14"}
        onChange={handleChange("panel14")}
      >
        <AccordionSummary aria-controls="panel14d-content" id="panel14d-header">
          <Typography>
            <b>Who will get the sales?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Total Package Price is sales of the store (less rental fee if you
            rented special events equipment from TEI) 10% Service Charge should
            be given to the staffs that catered to the event
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel15"}
        onChange={handleChange("panel15")}
      >
        <AccordionSummary aria-controls="panel15d-content" id="panel15d-header">
          <Typography>
            <b>Client wants to decorate the Catering Cart. Is this allowed?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We don't allow any decorations that could destroy the existing
            elements of the cart. If client wants to add hanging photos,
            lightbox, displays, cost and product is care of the client.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel16"}
        onChange={handleChange("panel16")}
      >
        <AccordionSummary aria-controls="panel16d-content" id="panel16d-header">
          <Typography>
            <b>I rented equipment from TEI. How will I pay for it?</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sir Noel will send a billing for the rental fee.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel17"}
        onChange={handleChange("panel17")}
      >
        <AccordionSummary aria-controls="panel17d-content" id="panel17d-header">
          <Typography>
            <b>
              Clients' Total Package Price is only at P12,000 but they want to
              use the catering cart / Total is only at P1,000 but they want a
              Table Set-up or Cart
            </b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If client won't hit the 10k / 15k package price, their table or cart
            set-up respectively is NOT free. If they want to include a table or
            cart but their package price is less than the required amount, they
            need to pay for an ADDITIONAL Fee for the rental.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
