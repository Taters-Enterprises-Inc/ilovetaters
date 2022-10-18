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

export default function CustomizedAccordionsCFAQ() {
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
          <b>How do I book my Event?</b>
        </AccordionSummary>
        <AccordionDetails>
          You may book your event via the online reservation portal at
          www.ilovetaters.com/shop. Once a reservation is placed, you will get a
          confirmation email and call from our Taters Representative within 48H
          to finalize your details.
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <b>Can I customize orders?</b>
        </AccordionSummary>
        <AccordionDetails>
          Yes! You may add products to our pre-made catering packages. We also
          have fully customizable "make your own" packages available.
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <b>How much is the minimum spend requirements for your packages?</b>
        </AccordionSummary>
        <AccordionDetails>
          Taters offers a FREE branded set-up for a standard minimum consumable
          package price of P10,000 (for a table set-up) and P15,000 (for a cart
          set-up).
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <b>
            Is Ingress / Egress part of the 3 Hours? What if I want you to
            extend?
          </b>
        </AccordionSummary>
        <AccordionDetails>
          The 3 hours consumable time will start during the agreed serving time.
          An additional charge of 500 php will be added for every succeeding
          hour.
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <b> Are there any additional fees? </b>
        </AccordionSummary>
        <AccordionDetails>
          Apart from a 10% service fee, there are additional charges for
          logistics (transpo, toll fee) and fees for on-site cooking*
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <b>Can I request for on-site cooking? (Eg: Popcorn Machine)</b>
        </AccordionSummary>
        <AccordionDetails>
          For on-site cooking, we will need electrical provisions. Electrical
          load will depend on the equipments the store will use; Popcorn machine
          depends on availability and will have an additional P850 charge.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <b>What payment terms do you accept </b>
        </AccordionSummary>
        <AccordionDetails>
          We accept cash, check, gcash, bank transfers, credit card (limited
          branch availability) payments on the following terms:
          <br />
          1) 50% down payment - 1 week before the event or earlier / 50% balance
          payment - on the day of the event
          <br />
          2) 100% payment - 1 week before the event or earlier
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <b>
            What if my event address and/or event date is not available in the
            website?
          </b>
        </AccordionSummary>
        <AccordionDetails>
          You may email our catering team at catering@tatersgroup.com so that
          they could assist you with your event inquiry
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <b>Are your rates VAT Inclusive?</b>
        </AccordionSummary>
        <AccordionDetails>Yes! All rates are VAT Inclusive</AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <b>
            I have an event for multiple days. Is it possible to book for more
            than 1 day?
          </b>
        </AccordionSummary>
        <AccordionDetails>
          You may email our catering team at catering@tatersgroup.com so that
          they could further assist you with your event inquiry.
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
          <b>How many guests can Taters serve?</b>
        </AccordionSummary>
        <AccordionDetails>
          Taters can accomodate as much as 5000 guests. However, additional
          staff will be required.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12")}
      >
        <AccordionSummary aria-controls="panel12d-content" id="panel12d-header">
          <b>
            Would it be possible to request for extra manpower or extra for my
            event?
          </b>
        </AccordionSummary>
        <AccordionDetails>
          Aside from the package inclusion of 2 staffs and 1 cart set-up,
          additional manpower and cart could be availed with an additional fee
          of P950 for the cart & P650 per staff.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel13"}
        onChange={handleChange("panel13")}
      >
        <AccordionSummary aria-controls="panel13d-content" id="panel13d-header">
          <b>Are your employees vaccinated?</b>
        </AccordionSummary>
        <AccordionDetails>
          All Taters employees are FULLY vaccinated and is well trained to
          ocmply with the standard health protocols
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel14"}
        onChange={handleChange("panel14")}
      >
        <AccordionSummary aria-controls="panel14d-content" id="panel14d-header">
          <b>Do you deliver to multiple locations?</b>
        </AccordionSummary>
        <AccordionDetails>
          Taters also provides a “new normal” catering where we offer single or
          multiple address deliveries for remote working scenarios with wide
          area delivery coverage spanning regions of Luzon, Visayas and
          Mindanao.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel15"}
        onChange={handleChange("panel15")}
      >
        <AccordionSummary aria-controls="panel15d-content" id="panel15d-header">
          <b>
            I want my own packaging / white label packaging, Is that possible?
          </b>
        </AccordionSummary>
        <AccordionDetails>
          You can provide your own packaging for the products, given that it
          will be given to the store 5 days before the event and it will fit the
          gram weight of our products.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel16"}
        onChange={handleChange("panel16")}
      >
        <AccordionSummary aria-controls="panel16d-content" id="panel16d-header">
          <b>Can you give food stubs for the attendees?</b>
        </AccordionSummary>
        <AccordionDetails>
          This could be arranged given that Taters was informed in advance and
          food stubs printing is in care of the client.
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel17"}
        onChange={handleChange("panel17")}
      >
        <AccordionSummary aria-controls="panel17d-content" id="panel17d-header">
          <b>Do you have other special arrangements?</b>
        </AccordionSummary>
        <AccordionDetails>
          Taters can also offer the ff inclusions but with an additional charge
          and subjected to availability:
          <br />
          Mr Poppy : Mascot appearance (no entertainement to be done) for 30
          minutes - P1,000.00
          <br />
          Party Accessories (balloons, generic cake) - Outsourced to our partner
          suppliers. Charges vary upon client requirements
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel18"}
        onChange={handleChange("panel18")}
      >
        <AccordionSummary aria-controls="panel18d-content" id="panel18d-header">
          <b>Would it be possible to customize the cart set-up?</b>
        </AccordionSummary>
        <AccordionDetails>
          Our cart designs can't be changed but you may request for additional
          cart props (eg hanging photo print-outs, signboard, customized
          messages like banner, standees, table tops) but with an additional
          charge and subject to availability
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
