import React from "react";
import { selectGetStoresAvailableBranches } from "../slices/get-stores-available-branches.slice";
import { NearyouSearchCard } from "./near-you-search-card";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@mui/material/styles/styled";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import Radio from "@mui/material/Radio";

import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";

import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useAppSelector } from "features/config/hooks";
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
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#a21013",
  borderBottom: "1px solid white",
  padding: 0,
  color: "white",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "18px 0 18px 0",
  backgroundColor: "#a21013",
  color: "white",
}));

export function NearyouSearchStore() {
  const getStoresAvailableBranchesState = useAppSelector(
    selectGetStoresAvailableBranches
  );

  return (
    <section className="text-white ">
      {getStoresAvailableBranchesState.search ? (
        <>
          {getStoresAvailableBranchesState.search.length > 0 ? (
            <>
              <section className="grid grid-cols-2 gap-4 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {getStoresAvailableBranchesState.search.map((store, index) => {
                  return <NearyouSearchCard store={store} key={index} />;
                })}
              </section>
            </>
          ) : (
            <h1 className="text-base font-bold text-center">
              Sorry, we don’t have a branch in this area. Try inputting another
              location.
            </h1>
          )}
        </>
      ) : (
        <>
          {getStoresAvailableBranchesState.data?.map((store_cluster, index) => (
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="text-white" />}
              >
                <div className="flex items-center justify-start flex-1 space-x-4">
                  <span>{store_cluster.region_name}</span>
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <section className="grid grid-cols-2 gap-4 pb-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                  {store_cluster.stores.map((store, index) => {
                    return <NearyouSearchCard store={store} key={index} />;
                  })}
                </section>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </section>
  );
}
