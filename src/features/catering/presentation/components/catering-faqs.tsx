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
  backgroundColor: "rgba(46, 43, 35, 0.6)",
}));

export default function CateringFaqs() {
  const [expanded, setExpanded] = React.useState<string | false>("panel0");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>How do I book my event?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You may book your event via the online reservation portal at
            www.ilovetaters.com/shop. Once a reservation is placed, you will get
            a confirmation email and call from our Taters Representative within
            48H to finalize your details.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Can I customize my order?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes! You may add products to our pre-made catering packages. We also
            have fully customizable "make your own" packages available.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>
            How much is the minimum spend requirement for your packages?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Taters offers a FREE branded set-up for a standard minimum
            consumable package price of P10,000 (for a table set-up) and P15,000
            (for a cart set-up).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>
            Is Ingress / Egress part of the 3 Hours? What if I want you to
            extend?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The 3 hours consumable time will start during the agreed serving
            time. An additional charge of 500 php will be added for every
            succeeding hour.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Are there any additional fees?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Apart from a 10% service fee, there are additional charges for
            logistics (transpo, toll fee) and fees for on-site cooking*
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>
            Can I request for on-site cooking? (Eg: Popcorn Machine)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            For on-site cooking, we will need electrical provisions. Electrical
            load will depend on the equipments the store will use; <br />{" "}
            Popcorn machine depends on availability and will have an additional
            P850 charge.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>What payment terms fo you accept?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We accept cash, check, gcash, bank transfers, credit card (limited
            branch availability) payments on the following terms:
            <br />
            1) 50% down payment - 1 week before the event or earlier / 50%
            balance payment - on the day of the event
            <br />
            2) 100% payment - 1 week before the event or earlier
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography>
            What if my event address and/or event date is not available in the
            website?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You may email our catering team at catering@tatersgroup.com so that
            they could assist you with your event inquiry
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography>Are your rates VAT Inclusive? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Yes! All rates are VAT Inclusive</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "pane20"}
        onChange={handleChange("pane20")}
      >
        <AccordionSummary aria-controls="pane20d-content" id="pane20d-header">
          <Typography>
            I have an event for multiple days. Is it possible to book for more
            than 1 day?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You may email our catering team at catering@tatersgroup.com so that
            they could further assist you with your event inquiry
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "pane21"}
        onChange={handleChange("pane21")}
      >
        <AccordionSummary aria-controls="pane21d-content" id="pane21d-header">
          <Typography>Do you offer further discounts?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Any further discounts for bulk or loyal customers are subject for
            review and approval by Taters management.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "pane22"}
        onChange={handleChange("pane22")}
      >
        <AccordionSummary aria-controls="pane22d-content" id="pane22d-header">
          <Typography>How many guests can Taters serve?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Taters can accomodate as much as 5000 guests. However, additional
            staff will be required
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "pane23"}
        onChange={handleChange("pane23")}
      >
        <AccordionSummary aria-controls="pane23d-content" id="pane23d-header">
          <Typography>
            Would it be possible to request for extra manpower or extra for my
            event?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Aside from the package inclusion of 2 staffs and 1 cart set-up,
            additional manpower and cart could be availed with an additional fee
            of P950 for the cart & P650 per staff
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "pane24"}
        onChange={handleChange("pane24")}
      >
        <AccordionSummary aria-controls="pane24d-content" id="pane24d-header">
          <Typography>Are your employees vaccinated?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            All Taters employees are FULLY vaccinated and is well trained to
            ocmply with the standard health protocols
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "pane25"}
        onChange={handleChange("pane25")}
      >
        <AccordionSummary aria-controls="pane25d-content" id="pane25d-header">
          <Typography>Do you deliver to multiple locations?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Taters also provides a “new normal” catering where we offer single
            or multiple address deliveries for remote working scenarios with
            wide area delivery coverage spanning regions of Luzon, Visayas and
            Mindanao.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "pane26"}
        onChange={handleChange("pane26")}
      >
        <AccordionSummary aria-controls="pane26d-content" id="pane26d-header">
          <Typography>
            I want my own packaging / white label packaging, Is that possible?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can provide your own packaging for the products, given that it
            will be given to the store 5 days before the event and it will fit
            the gram weight of our products.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "pane27"}
        onChange={handleChange("pane27")}
      >
        <AccordionSummary aria-controls="pane27d-content" id="pane27d-header">
          <Typography>Can you give food stubs for the attendees?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This could be arranged given that Taters was informed in advance and
            food stubs printing is in care of the client.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "pane28"}
        onChange={handleChange("pane28")}
      >
        <AccordionSummary aria-controls="pane28d-content" id="pane28d-header">
          <Typography>Do you have other special arrangements?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Taters can also offer the ff inclusions but with an additional
            charge and subjected to availability:
            <br />
            Mr Poppy : Mascot appearance (no entertainement to be done) for 30
            minutes - P1,000.00
            <br />
            Party Accessories (balloons, generic cake) - Outsourced to our
            partner suppliers. Charges vary upon client requirements
            <br />
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "pane29"}
        onChange={handleChange("pane29")}
      >
        <AccordionSummary aria-controls="pane29d-content" id="pane29d-header">
          <Typography>
            Would it be possible to customize the cart set-up?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our cart designs can't be changed but you may request for additional
            cart props (eg hanging photo print-outs, signboard, customized
            messages like banner, standees, table tops) but with an additional
            charge and subject to availability
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
