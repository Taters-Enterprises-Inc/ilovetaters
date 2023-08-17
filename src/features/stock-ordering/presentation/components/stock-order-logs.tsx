import { Button, Divider, List, ListItem } from "@mui/material";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

interface StockOrderLogsProps {
  order_details: {
    [key: string]:
      | string
      | number
      | boolean
      | {
          date: string;
          first_name: string;
          last_name: string;
          remarks: string;
        }[];
  };
}

export function StockOrderLogs(props: StockOrderLogsProps) {
  let columns = [
    { id: "store_name", label: "Store", isButton: false, isDate: false },
    {
      id: "ship_to_address",
      label: "Ship to Address",
      isButton: false,
      isDate: false,
    },
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
      id: "order_reviewed_date",
      label: "Order Reviewed Date",
      isButton: false,
      isDate: true,
    },

    {
      id: "view_delivery_receipt",
      label: "Download Sales Invoice",
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
      label: "Download Updated Sales Invoice",
      isButton: true,
      isDate: false,
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
    {
      id: "updated_delivery_goods_receipt",
      label: "Updated Goods Sales Invoice",
      isButton: true,
      isData: false,
    },
    {
      id: "updated_delivery_region_receipt",
      label: "Updated Goods Region Invoice",
      isButton: true,
      isData: false,
    },
  ];

  const handleOnclick = (id: string) => {
    switch (id) {
      case "view_delivery_receipt":
        // const filename_delivery_receipt = props.order_details
        //   .view_delivery_receipt as string;
        // const url_delivery_receipt = `${REACT_APP_DOMAIN_URL}api/stock/ordered/download_file_information/${filename_delivery_receipt}`;
        // window.open(url_delivery_receipt, "_blank");

        if ("order_number" in props.order_details) {
          const id = props.order_details.order_number;
          const link = `${REACT_APP_DOMAIN_URL}api/stock/generate-multim-si-pdf/${id}`;

          window.open(link, "_blank");
        }
        break;

      case "view_updated_delivery_receipt":
        if ("order_number" in props.order_details) {
          const id = props.order_details.order_number;
          const link = `${REACT_APP_DOMAIN_URL}api/stock/generate-si-pdf/${id}`;

          window.open(link, "_blank");
        }
        break;

      case "updated_delivery_goods_receipt":
        const filename_updated_delivery_goods_receipt = props.order_details
          .view_delivery_receipt as string;
        const url_updated_delivery_goods_receipt = `${REACT_APP_DOMAIN_URL}api/stock/ordered/download_file_information/${filename_updated_delivery_goods_receipt}`;
        window.open(url_updated_delivery_goods_receipt, "_blank");
        break;

      case "updated_delivery_region_receipt":
        const filenameupdated_delivery_region_receipt = props.order_details
          .view_delivery_receipt as string;
        const urlupdated_delivery_region_receipt = `${REACT_APP_DOMAIN_URL}api/stock/ordered/download_file_information/${filenameupdated_delivery_region_receipt}`;
        window.open(urlupdated_delivery_region_receipt, "_blank");
        break;

      case "view_payment_details":
        const filename_payment_details = props.order_details
          .view_payment_details as string;
        const url_payment_details = `${REACT_APP_DOMAIN_URL}api/stock/ordered/download_file_information/${filename_payment_details}`;
        window.open(url_payment_details, "_blank");

        break;
    }
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
                          <span className="basis-1/2 font-semibold capitalize whitespace-normal">
                            {row.id === "dispatch_date"
                              ? `${row.label} ${props.order_details.transport_route}:`
                              : row.label}
                          </span>

                          <span className="basis-1/2 capitalize whitespace-normal">
                            {getOrderData(
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

              <ListItem className="flex space-x-4" dense={true}>
                <span className="basis-1/2 font-semibold break-all capitalize">
                  Remarks:
                </span>
                <span className="basis-1/2">
                  {Array.isArray(props.order_details["remarks"]) &&
                    props.order_details["remarks"].length > 0 && (
                      <div>
                        {props.order_details["remarks"].map((log) => (
                          <div className="border border-gray-300 rounded-lg shadow space-y-2 py-2 px-5">
                            <span className="text-base whitespace-normal normal-case">
                              {log.remarks}
                            </span>
                            <div className="flex flex-row text-xs space-x-5">
                              <div className="space-x-2">
                                <span>{log.first_name}</span>
                                <span>{log.last_name}</span>
                              </div>
                              <Divider orientation="vertical" flexItem />
                              <span>{log.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </span>
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    </>
  );
}
