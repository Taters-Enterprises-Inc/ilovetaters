import {
  Box,
  Button,
  Divider,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { useState } from "react";

interface StockOrderLogsProps {
  order_details: {
    [key: string]: any;
  };
}

interface trackingModel {
  name: string;
  datetime: string;
  first_name: string;
  last_name: string;
}

interface remarksModel {
  date: string;
  first_name: string;
  last_name: string;
  remarks: string;
}

export function StockOrderLogs(props: StockOrderLogsProps) {
  const documentFiles = [
    { id: "delivery_receipt", label: "Delivery Receipt", processId: 4 },
    {
      id: "updated_delivery_receipt",
      label: "Updated Delivery Receipt",
      processId: 5,
    },
    {
      id: "sales_invoice",
      label: "Download sales invoice",
      processId: 6,
    },
    {
      id: "theoretical_invoice",
      label: "Generate Theoretical Invoice",
      processId: 6,
    },
    {
      id: "updated_delivery_goods_receipt",
      label: "Updated goods invoice",
      processId: 7,
    },
    {
      id: "updated_delivery_region_receipt",
      label: "Updated region invoice",
      processId: 7,
    },
    { id: "payment_detail_image", label: "Payment detail image", processId: 8 },
  ];

  const [trackingShowMore, setTrackingShowMore] = useState(false);
  const [downloadableShowMore, setDownloadableShowMore] = useState(false);
  const [remarkShowMore, setRemarkShowMore] = useState(false);

  const styledButton = {
    backgroundColor: "white",
    ":hover": {
      backgroundColor: "white",
    },
  };

  const handleTrackingShowMore = () => {
    if (props.order_details["tracking"].length < 1) {
      return "fit-content";
    } else {
      if (trackingShowMore) {
        return "fit-content";
      } else {
        return 75;
      }
    }
  };

  const handleRemarks = () => {
    if (props.order_details.remarks.length <= 1) {
      return "h-fit";
    } else {
      if (remarkShowMore) {
        return "h-fit";
      } else {
        return "h-44";
      }
    }
  };

  const isValidDate = (dateStr: string): boolean => {
    const dateObj = new Date(dateStr);
    return !isNaN(dateObj.getTime());
  };

  const getOrderDate = (value: string | number | boolean) => {
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

  const handleDownload = (type: string) => {
    const id = props.order_details.id;
    let link = "";

    if (type === "sales_invoice") {
      link = `${REACT_APP_DOMAIN_URL}api/stock/generate-multim-si-pdf/${id}`;
    } else if (type === "theoretical_invoice") {
      link = `${REACT_APP_DOMAIN_URL}api/stock/generate-si-pdf/${id}`;
    } else {
      link = `${REACT_APP_DOMAIN_URL}api/stock/ordered/download_file_information/${type}`;
    }

    window.open(link, "_blank");
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

          {props.order_details.remarks.length !== 0 && (
            <div className="space-y-2">
              <span className="text-base font-semibold md:text-lg md:font-bold">
                Remarks
              </span>

              <div className="border border-gray-200 shadow rounded-md bg-white px-5 pt-5 space-y-2 overflow-hidden">
                <div className={`"space-y-3 " ${handleRemarks()}`}>
                  {props.order_details.remarks.map((remark: remarksModel) => (
                    <>
                      <div className="flex flex-col space-y-2 py-2">
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {remark.first_name + " " + remark.last_name}
                          </span>
                          <span className="text-sm">{remark.date}</span>
                        </div>
                        <span>{remark.remarks}</span>
                      </div>
                      <Divider />
                    </>
                  ))}
                </div>

                <Button
                  onClick={() =>
                    remarkShowMore
                      ? setRemarkShowMore(false)
                      : setRemarkShowMore(true)
                  }
                  size="small"
                  fullWidth
                  sx={styledButton}
                >
                  {props.order_details.remarks.length > 2
                    ? remarkShowMore
                      ? "Show Less"
                      : "Show more"
                    : null}
                </Button>
              </div>
            </div>
          )}

          {props.order_details["tracking"].length !== 0 && (
            <div className="space-y-2">
              <span className="text-base font-semibold md:text-lg md:font-bold">
                Tracking Log
              </span>

              <div className="border border-gray-200 shadow rounded-md bg-white px-5 pt-5 space-y-2">
                <Box
                  sx={{
                    maxWidth: "100%",
                    height: handleTrackingShowMore(),
                    overflow: "hidden",
                  }}
                >
                  <Stepper
                    activeStep={props.order_details["tracking"].length}
                    orientation="vertical"
                  >
                    {props.order_details["tracking"].map(
                      (step: trackingModel, index: number) => (
                        <Step key={index}>
                          <StepLabel sx={{ marginRight: 5 }}>
                            <div className="flex flex-col">
                              <span className="text:sm md:text-base font-semibold">
                                {step.name}
                              </span>
                              <span className="text-xs">
                                {getOrderDate(step.datetime)}
                              </span>
                              <span className="text-xs">
                                Performed by:{" "}
                                {step.first_name + " " + step.last_name}
                              </span>
                            </div>
                          </StepLabel>
                        </Step>
                      )
                    )}
                  </Stepper>
                </Box>
                <Button
                  onClick={() =>
                    trackingShowMore
                      ? setTrackingShowMore(false)
                      : setTrackingShowMore(true)
                  }
                  sx={styledButton}
                  size="small"
                  fullWidth
                >
                  {props.order_details["status_id"] >= 2
                    ? trackingShowMore
                      ? "Show Less"
                      : "Show more"
                    : null}
                </Button>
              </div>
            </div>
          )}

          {props.order_details.status_id >= 4 &&
            props.order_details.status_id < 10 && (
              <div className="space-y-2">
                <span className="text-base font-semibold md:text-lg md:font-bold">
                  Invoices and payment files
                </span>

                <div className="border border-gray-200 shadow rounded-md bg-white px-5 pt-5 space-y-2 overflow-hidden">
                  <div
                    className={`"" ${
                      !downloadableShowMore ? "h-16" : "h-fit"
                    } `}
                  >
                    {documentFiles.map((row) => (
                      <>
                        {row.processId <= props.order_details.status_id && (
                          <>
                            <div className="flex justify-between">
                              <span>{row.label}</span>
                              <Button
                                onClick={() => handleDownload(row.id)}
                                size="small"
                              >
                                Download
                              </Button>
                            </div>
                            <Divider />
                          </>
                        )}
                      </>
                    ))}
                  </div>
                  {props.order_details.status_id > 5 && (
                    <Button
                      onClick={() =>
                        downloadableShowMore
                          ? setDownloadableShowMore(false)
                          : setDownloadableShowMore(true)
                      }
                      size="small"
                      sx={styledButton}
                      fullWidth
                    >
                      {downloadableShowMore ? "Show Less" : "Show more"}
                    </Button>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
