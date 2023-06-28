import { Button, Divider, List, ListItem } from "@mui/material";
import { PayBillingModal, UploadDeliveryRecieptModal } from "../modals";
import { useState } from "react";

interface StockOrderLogsProps {
  order_details: {
    [key: string]: string | number;
  };
}

export function StockOrderLogs(props: StockOrderLogsProps) {
  let columns = [
    { id: "store_name", label: "Store", isButton: false },
    { id: "order_number", label: "Order Number", isButton: false },
    {
      id: "requested_delivery_date",
      label: "Requested Delivery Date",
      isButton: false,
    },
    {
      id: "commited_delivery_date",
      label: "Commited Delivery Date",
      isButton: false,
    },
    {
      id: "order_reviewed_date",
      label: "Order Reviewed Date",
      isButton: false,
    },
    {
      id: "order_confirmation_date",
      label: "Order Confirmation Date",
      isButton: false,
    },
    {
      id: "view_delivery_receipt",
      label: "View Delivery Receipt",
      isButton: true,
    },
    { id: "dispatch_date", label: "Dispatch Date", isButton: false },
    { id: "order_enroute", label: "Order Enroute", isButton: false },
    {
      id: "actual_delivery_date",
      label: "Actual Delivery Date",
      isButton: false,
    },
    {
      id: "view_updated_delivery_receipt",
      label: "View Updated Delivery Receipt",
      isButton: true,
    },
    {
      id: "billing_information_ready",
      label: "Billing Information Ready",
      isButton: false,
    },
    {
      id: "view_payment_details",
      label: "View Payment Details",
      isButton: true,
    },
    {
      id: "payment_confirmation",
      label: "payment Confirmation",
      isButton: false,
    },
  ];

  const [openUploadDeliveryRecieptModal, setOpenUploadDeliveryRecieptModal] =
    useState(false);

  const [openPayBillingModal, setOpenPayBillingModal] = useState(false);

  const handleOnclick = (id: string) => {
    switch (id) {
      case "view_delivery_receipt":
        setOpenUploadDeliveryRecieptModal(true);
        break;

      case "view_updated_delivery_receipt":
        setOpenUploadDeliveryRecieptModal(true);
        break;

      case "view_payment_details":
        setOpenPayBillingModal(true);
        break;
    }
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
                  {row.isButton ? (
                    <div className="flex">
                      <Button
                        className="basis-1/2"
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
                        {row.label}
                      </span>
                      <span className="basis-1/2 capitalize break-all">
                        {props.order_details[row.id]}
                      </span>
                    </ListItem>
                  )}

                  <Divider variant="middle" />
                </div>
              ))}
            </List>
          </div>
        </div>
      </div>

      <UploadDeliveryRecieptModal
        open={openUploadDeliveryRecieptModal}
        onClose={() => setOpenUploadDeliveryRecieptModal(false)}
        setUploadedReciept={undefined}
        isButtonAvailable={false}
      />

      <PayBillingModal
        open={openPayBillingModal}
        onClose={() => setOpenPayBillingModal(false)}
        setUploadedReciept={undefined}
        billingInformation={{
          billing_id: "test",
          billing_amount: "test",
        }}
        isButtonAvailable={false}
      />
    </>
  );
}
