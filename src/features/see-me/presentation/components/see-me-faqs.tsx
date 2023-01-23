import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import SeeMeTable from "./see-me-table";

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
}));

export default function SeeMeFaqs() {
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
          <Typography>What are my Franchise options?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SeeMeTable />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Why should I Franchise Taters?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            • Offers American inspired entertainment snacks that is easy to
            prepare and sell. <br />
            • Low risk and easy to manage business.
            <br />
            • Good concept and innovative products and marketing.
            <br />
            • Positive brand recognition as a leading entertainment snack brands
            in the Philippines.
            <br />
            • Direct assistance from the Franchisor and team.
            <br />
            • Continuous products R&D.
            <br />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Do you guarantee success to your franchisees?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A franchise gives the Franchisee the opportunity to follow the
            business system that the Franchisor has proved to be successful.
            Your success as a Franchisee highly depends on the commitment you
            give to the business.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>
            How long will it take to recover my investment?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            It depends upon the financial viability on various factors such as
            sales, investment and ability of the Franchisee to effectively
            manage their expenses. This will be discussed further during the
            Franchisor-Franchisee sit down discussion.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>
            Do I need to purchase all the supplies and equipment needed from the
            Franchisor?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            As a Franchisee, you are required to purchase all the supplies and
            equipment from us and from our accredited suppliers. You will be
            provided with a Procurement Program to guide you upon purchasing all
            the supplies and equipment that you need to set up the franchise
            outlet.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>
            Will the Franchisor help me find a good location? What will be the
            ideal location?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Each franchisee is responsible for securing their own location but
            there are some instances that the Franchisor may have space offers
            to share with prospective Franchisees in their areas. All potential
            sites must be submitted to the Franchisor for approval. The ideal
            location should be near or within heavy foot traffic areas like
            malls, parks, business districts and even local communities with
            busy streets.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>
            Prior to and during opening of the franchised outlet, will there be
            an assistance from the Franchisor’s head office?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The Franchisor will send a representative who will assist you in the
            training of personnel, acquisition of supplies and equipment, and
            other arrangements. There will also be a monthly visit from the
            Franchisor’s office to monitor and provide you a proper assistance.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>Who will do the Marketing?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The Franchisor will provide the marketing and advertisement via
            social media updates through Taters official website, Facebook page
            and Instagram account. All marketing collaterals will be given upon
            request.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography>
            Are you going to provide a comprehensive Franchise Operations
            Manual?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Definitely! As a Franchisor, it is our responsibility to give you a
            comprehensive and easy to understand manual that details Taters Day
            to Day Operations.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography>What are the steps to apply for a Franchise?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            1. Fill out the Confidential Questionnaire. Together with your
            Letter of Intent, and send them to: franchising@tatersgroup.com{" "}
            <br />
            2. We will review your application. <br />
            3. You will be invited to discuss franchise details. <br />
            4. We will present you with a franchise disclosure information.{" "}
            <br />
            5. Your proposed location will be visited and thoroughly checked.{" "}
            <br />
            6. The Franchise agreement can now be executed. <br />
            7. Outlet set-up and staff training will commence. <br />
            8. We will provide pre-opening assistance. <br />
            9. Your Grand Opening! Congratulations! <br />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
