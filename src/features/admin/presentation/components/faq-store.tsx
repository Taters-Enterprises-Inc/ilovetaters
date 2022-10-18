import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

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
          <b>Who can Cater to Clients?</b>
        </AccordionSummary>
        <AccordionDetails>
          All Taters stores can offer catering services given that they have the
          equipment, stocks, enough manpower, and catering knowledge.
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <b>Can my store join the Catering System?</b>
        </AccordionSummary>
        <AccordionDetails>
          We will only include all stores that have their OWN Table or Cart
          Set-up in the system TEI Carts and Table Set-up is only available for
          RENT if they're a TEI owned store.
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <b>How much is a Catering Cart? Table Set-up?</b>
        </AccordionSummary>
        <AccordionDetails>N/A</AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <b>What are the designs for the Catering Cart? Table Set-up?</b>
        </AccordionSummary>
        <AccordionDetails>
          For the cart, we have two designs: Rustic and Sporty For the Table
          Set-up, we have our standard table set-up
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <b> Can we offer discounts?</b>
        </AccordionSummary>
        <AccordionDetails>
          The new catering packages are already discounted (ranging from 3% to
          10%). But if you still wish to offer more discounts for the package
          price, this will be decided by the Store Managing Partner or Area
          Manager
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <b>Client is asking to withhold tax. What to do?</b>
        </AccordionSummary>
        <AccordionDetails>
          We only allow withholding tax if they can present a BIR 2307 OR PEZA
          Certificate Withtholding Tax = 1% for Product ; 2% for Service Fee *
          this will be computed by the finance of the client. Make sure to
          inform them about the %.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <b>Client is requesting for SOA and SI. How to proceed?</b>
        </AccordionSummary>
        <AccordionDetails>
          For Full Franchised Stores, you should be able to create your own SOA
          and SI For TEI / Family-Owned Stores, you could request for a SOA from
          TEI Finance. SI is up to the store.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <b>How to punch Catering Transactions?</b>
        </AccordionSummary>
        <AccordionDetails>
          Special Sales (including Catering) is NOT punched in the POS but IS
          adjusted in the IMS (stock inventory adjustment) <br />
          For Full Franchised Community Stores, you can punch your Catering
          Transactions in the POS by clicking the Catering Packages Button.
          Discounts will be applied via Price Discount button.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <b>How to prepare Catering Packages on the day of the event?</b>
        </AccordionSummary>
        <AccordionDetails>Coordinate with Sir Jayson.</AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <b>Client is requesting for a claim stub, what should we do?</b>
        </AccordionSummary>
        <AccordionDetails>
          Claim stubs should be in care of the client.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel10"}
        onChange={handleChange("panel10")}
      >
        <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
          <b>Do you offer further discounts?</b>
        </AccordionSummary>
        <AccordionDetails>
          Any further discounts for bulk or loyal customers are subject for
          review and approval by Taters management.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel11"}
        onChange={handleChange("panel11")}
      >
        <AccordionSummary aria-controls="panel11d-content" id="panel11d-header">
          <b>Accreditation Process</b>
        </AccordionSummary>
        <AccordionDetails>N/A</AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12")}
      >
        <AccordionSummary aria-controls="panel12d-content" id="panel12d-header">
          <b>Where can we get a trucking service?</b>
        </AccordionSummary>
        <AccordionDetails>
          You can email sir Noel if the truck is available to cater to your
          event or you could book via third party courier (Transportify /
          Lalamove / Kickstart)
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel13"}
        onChange={handleChange("panel13")}
      >
        <AccordionSummary aria-controls="panel13d-content" id="panel13d-header">
          <b>How do we compute for the Package Grand Total?</b>
        </AccordionSummary>
        <AccordionDetails>
          Package Price (less) discounts = Total Package Price + 10% Service
          Charge + Transpo Fee + Other Fees
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel14"}
        onChange={handleChange("panel14")}
      >
        <AccordionSummary aria-controls="panel14d-content" id="panel14d-header">
          <b>Who will get the sales?</b>
        </AccordionSummary>
        <AccordionDetails>
          Total Package Price is sales of the store (less rental fee if you
          rented special events equipment from TEI) 10% Service Charge should be
          given to the staffs that catered to the event
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel15"}
        onChange={handleChange("panel15")}
      >
        <AccordionSummary aria-controls="panel15d-content" id="panel15d-header">
          <b>Client wants to decorate the Catering Cart. Is this allowed?</b>
        </AccordionSummary>
        <AccordionDetails>
          We don't allow any decorations that could destroy the existing
          elements of the cart. If client wants to add hanging photos, lightbox,
          displays, cost and product is care of the client.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel16"}
        onChange={handleChange("panel16")}
      >
        <AccordionSummary aria-controls="panel16d-content" id="panel16d-header">
          <b>I rented equipment from TEI. How will I pay for it?</b>
        </AccordionSummary>
        <AccordionDetails>
          Sir Noel will send a billing for the rental fee.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel17"}
        onChange={handleChange("panel17")}
      >
        <AccordionSummary aria-controls="panel17d-content" id="panel17d-header">
          <b>
            Clients' Total Package Price is only at P12,000 but they want to use
            the catering cart / Total is only at P1,000 but they want a Table
            Set-up or Cart
          </b>
        </AccordionSummary>
        <AccordionDetails>
          If client won't hit the 10k / 15k package price, their table or cart
          set-up respectively is NOT free. If they want to include a table or
          cart but their package price is less than the required amount, they
          need to pay for an ADDITIONAL Fee for the rental.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
