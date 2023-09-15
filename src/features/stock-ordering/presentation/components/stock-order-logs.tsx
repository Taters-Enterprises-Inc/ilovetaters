import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { useState } from "react";
import { AnyIfEmpty } from "react-redux";

interface StockOrderLogsProps {
  order_details: {
    [key: string]: any;
  };
}

export function StockOrderLogs(props: StockOrderLogsProps) {
  //Temporary need to make it dynamic
  const trackingInformation = [
    {
      label: "Order recently placed",
      description: "Order placement Date",
    },
    {
      label: "Supplier has confirm the quantity and date",
      description: "Requested delivery Date",
    },
    {
      label: "Order has been reviewed by TEI Procurement",
      description: "Commmited delivery Date",
    },
    {
      label: "Order has been deployed by the supplier",
      description: "Order review Date",
    },
    {
      label: "Order has been received by the recieving store",
      description: "Order dispatch Date",
    },
    {
      label: "Order has checked and approved by the store manager",
      description: "Order dispatch Date",
    },
    {
      label: "Supplier has updated/awcknowledged the billing information",
      description: "Order dispatch Date",
    },
    {
      label: "Finance has settled the payment ",
      description: "Order dispatch Date",
    },
    {
      label: "Supplier has awknowledge the payment and completed the order",
      description: "Order dispatch Date",
    },
  ];

  const isValidDate = (dateStr: string): boolean => {
    const dateObj = new Date(dateStr);
    return !isNaN(dateObj.getTime());
  };

  const getOrderData = (value: string | number | boolean) => {
    if (isValidDate(value as string) && value !== null) {
      return new Date(value as string).toLocaleDateString("en-PH", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    }

    return value;
  };

  return (
    <>
      <div className="p-4 space-y-2 overflow-auto max-h-60">
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-base font-semibold md:text-lg md:font-bold">
              Order Information
            </span>

            <div className="border border-gray-200 shadow rounded-md bg-white p-5 space-y-2">
              <div className="flex flex-col text-xs md:text-base space-y-2">
                <div className="flex space-x-3">
                  <div>
                    <span className="font-semibold">Order product type: </span>
                    <span>{props.order_details["category_name"]}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Region: </span>
                    <span>{props.order_details["region_name"]}</span>
                  </div>
                </div>
                <Divider />
                <div className="space-x-3">
                  <span>Tracking Number: </span>
                  <span>{"#" + props.order_details["id"]}</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 shadow rounded-md bg-white p-5 space-y-2">
              <div className="flex flex-col text-xs md:text-base space-y-2">
                <span className="font-semibold">
                  {props.order_details["store_name"] as string}
                </span>
                <span>{props.order_details["ship_to_address"]}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-base font-semibold md:text-lg md:font-bold">
              Tracking Log
            </span>

            <div className="border border-gray-200 shadow rounded-md bg-white p-5 space-y-2">
              <Box sx={{ maxWidth: 400 }}>
                <Stepper
                  activeStep={props.order_details["status_id"]}
                  orientation="vertical"
                >
                  {trackingInformation.map((step, index: number) => {
                    if (index < props.order_details["status_id"]) {
                      return (
                        <Step key={index}>
                          <StepLabel>{step.label}</StepLabel>
                          <StepContent>
                            <Typography>{step.description}</Typography>
                          </StepContent>
                        </Step>
                      );
                    }
                    return null;
                  })}
                </Stepper>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
