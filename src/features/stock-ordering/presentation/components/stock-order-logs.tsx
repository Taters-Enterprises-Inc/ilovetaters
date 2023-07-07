import { Button, Divider, List, ListItem } from "@mui/material";
import { useState } from "react";
import { ViewImageModal } from "../modals/view-image.modal";

interface StockOrderLogsProps {
  order_details: {
    [key: string]: string | number | boolean | { remarks: string }[];
  };
}

export function StockOrderLogs(props: StockOrderLogsProps) {
  let columns = [
    { id: "store_name", label: "Store", isButton: false, isDate: false },
    {
      id: "order_number",
      label: "Order Number",
      isButton: false,
      isDate: false,
    },
    {
      id: "requested_delivery_date",
      label: "Requested Delivery Date",
      isButton: false,
      isDate: true,
    },
    {
      id: "commited_delivery_date",
      label: "Commited Delivery Date",
      isButton: false,
      isDate: true,
    },
    {
      id: "remarks",
      label: "remarks after reviewing order: ",
      isButton: false,
      isDate: false,
      identifier: "reviewed",
    },
    {
      id: "order_reviewed_date",
      label: "Order Reviewed Date",
      isButton: false,
      isDate: true,
    },
    {
      id: "order_confirmation_date",
      label: "Order Confirmation Date",
      isButton: false,
      isDate: true,
    },
    {
      id: "view_delivery_receipt",
      label: "View Sales Invoice",
      isButton: true,
      isDate: false,
    },
    {
      id: "dispatch_date",
      label: "Dispatch Date",
      isButton: false,
      isDate: true,
    },
    {
      id: "actual_delivery_date",
      label: "Actual Delivery Date",
      isButton: false,
      isDate: true,
    },
    {
      id: "view_updated_delivery_receipt",
      label: "View Updated Sales Invoice",
      isButton: true,
      isDate: false,
    },
    {
      id: "remarks",
      label: "Remarks after approved: ",
      isButton: false,
      isDate: false,
      identifier: "approved",
    },
    {
      id: "billing_information_ready",
      label: "Billing Information Ready",
      isButton: false,
      isDate: false,
      identifier: "",
    },
    {
      id: "view_payment_details",
      label: "View Payment Details",
      isButton: true,
      isDate: false,
    },
    {
      id: "payment_confirmation",
      label: "payment Confirmation",
      isButton: false,
      isDate: true,
    },
  ];

  const [openImagePreviewer, setOpenImagePreviewer] = useState(false);
  const [image, setImage] = useState<string>("");

  const handleOnclick = (id: string) => {
    switch (id) {
      case "view_delivery_receipt":
        setImage(props.order_details.view_delivery_receipt as string);
        break;
      case "view_payment_details":
        setImage(props.order_details.view_payment_details as string);
        break;
      case "view_updated_delivery_receipt":
        setImage(props.order_details.view_updated_delivery_receipt as string);
        break;
    }
    setOpenImagePreviewer(true);
  };

  const isValidDate = (dateStr: string): boolean => {
    const dateObj = new Date(dateStr);
    return !isNaN(dateObj.getTime());
  };

  const getOrderData = (value: string | number | boolean, isDate: boolean) => {
    if (isDate && isValidDate(value as string) && value !== null) {
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

  const handleRemarks = (
    value: string | number | boolean | { remarks: string }[],
    identifier: string
  ) => {
    if (Array.isArray(value)) {
      if (value[0] && identifier === "reviewed") {
        return value[0].remarks;
      } else if (value[1] && identifier === "approved") {
        return value[1].remarks;
      }
    }

    return null;
  };

  return (
    <>
      <div className=" p-4 space-y-2">
        <div className="border-2 border-t-8 border-secondary rounded-t-lg">
          <div className="bg-secondary">
            <span className="text-white px-5">Order Tracking Logs</span>
          </div>

          <div className="max-h-64 overflow-auto">
            <List>
              {columns.map((row: any, index) => (
                <div key={index}>
                  {props.order_details[row.id] ? (
                    <>
                      {row.isButton ? (
                        <div className="flex">
                          <Button
                            className="basis-full"
                            onClick={() => handleOnclick(row.id)}
                            fullWidth
                            size="small"
                            variant="text"
                          >
                            {row.label}
                          </Button>
                        </div>
                      ) : (
                        <ListItem className="flex space-x-4" dense={true}>
                          <span className="basis-1/2 font-semibold break-all capitalize">
                            {row.id === "dispatch_date"
                              ? `${row.label} ${props.order_details.transport_route}:`
                              : row.label}
                          </span>
                          <span className="basis-1/2 capitalize break-all">
                            {row.id === "remarks"
                              ? handleRemarks(
                                  props.order_details[row.id],
                                  row.identifier
                                )
                              : getOrderData(
                                  props.order_details[row.id] as
                                    | string
                                    | number
                                    | boolean,
                                  row.isDate
                                )}
                          </span>
                        </ListItem>
                      )}
                      <Divider variant="middle" />
                    </>
                  ) : null}
                </div>
              ))}
            </List>
          </div>
        </div>
      </div>

      <ViewImageModal
        open={openImagePreviewer}
        onClose={() => setOpenImagePreviewer(false)}
        image={image}
        isDownloadable={false}
      />
    </>
  );
}
